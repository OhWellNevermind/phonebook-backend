const User = require("../db/models/userModel");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const signUp = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (await User.findOne({ email })) {
      res.status(409).json({ message: "Email already is in use" });
      return;
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.hashPassword();
    await newUser.save();

    const payload = {
      id: newUser._id,
    };
    const token = jwt.sign(payload, JWT_SECRET);
    await User.findByIdAndUpdate(newUser._id, { token });
    res.status(201).json({
      token,
      user: {
        name,
        email,
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Email or password is incorrect" });
    return;
  }
  const isPasswordEqual = await user.comparePasswords(password);
  if (!isPasswordEqual) {
    res.status(401).json({ message: "Email or password is incorrect" });
    return;
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user: { email: user.email, name: user.name },
  });
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.sendStatus(204);
  } catch (error) {
    console.log(error.message);
  }
};

const getCurrentUser = (req, res, next) => {
  try {
    const { name, email } = req.user;
    console.log(req.user);
    res.json({ name, email });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  signUp,
  login,
  logout,
  getCurrentUser,
};
