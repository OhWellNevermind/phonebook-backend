const jwt = require("jsonwebtoken");
const User = require("../db/models/userModel");
const { JWT_SECRET } = process.env;

const checkToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    res.status(401).json({ message: "Not authorized" });
    return;
  }

  const payload = jwt.verify(token, JWT_SECRET);
  try {
    const user = await User.findById(payload.id);
    if (!user || !user.token || token !== user.token) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = checkToken;
