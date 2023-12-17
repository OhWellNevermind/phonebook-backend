const express = require("express");
const { validateData } = require("../decorators/contactsDecorator");
const { newUserSchema, loginSchema } = require("../schemas/usersSchemas");
const {
  signUp,
  login,
  logout,
  getCurrentUser,
  updAvatar,
} = require("../controllers/usersControllers");
const checkToken = require("../midlewares/checkToken");
const { upload } = require("../midlewares/upload");
const router = express.Router();

router.post("/signup", validateData(newUserSchema), signUp);
router.post("/login", validateData(loginSchema), login);
router.post("/logout", checkToken, logout);
router.get("/current", checkToken, getCurrentUser);
router.patch("/avatars", checkToken, upload.single("avatar"), updAvatar);
module.exports = router;
