const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const usersController = require("../controllers/users-controllers");
const fileUpload = require("../middleware/file-upload");

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  // We are looking for the image key here
  fileUpload.single('image'),
  [
    check("name").not().isEmpty(),
    check("password").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
  ],
  usersController.signUp
);

router.post(
  "/login",
  [
    check("password").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
  ],
  usersController.login
);

module.exports = router;
