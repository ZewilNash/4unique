const express = require("express");

const router = express.Router();

const authenticatedRoute = require("../middleware/auth");
const isAdminRoute = require("../middleware/isAdmin");
 
const {signup , login ,forgotPass,changePass} = require("../controllers/auth");

router.route("/signup").post(signup);
router.route("/login").post(login);

router.route("/forgotPass").patch(forgotPass);
router.route("/changePass").patch(changePass);

module.exports = router;