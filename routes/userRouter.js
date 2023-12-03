const express = require("express");
const { validateData } = require("../decorators/contactsDecorator");
const { newUserSchema, loginSchema } = require("../schemas/usersSchemas");
const { signUp, login, logout, getCurrentUser } = require("../controllers/usersControllers");
const checkToken = require("../midlewares/checkToken");
const router = express.Router();

router.post("/signup", validateData(newUserSchema), signUp);
router.post("/login", validateData(loginSchema), login);
router.post("/logout", checkToken, logout);
router.get("/current", checkToken, getCurrentUser);

module.exports = router;
