const express = require("express");
const controller = require("./auth.controller");

const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");
const authorize = require("../../middlewares/authorize");

const router = express.Router();

// LOGIN
router.post("/login", controller.login);

// REFRESH
router.post("/refresh-token", controller.refreshToken);

// LOGOUT
router.post("/logout", controller.logout);

// CREATE USER (role based)
router.post(
    "/create-user",
    authMiddleware,
    roleMiddleware(["SUPER_ADMIN", "SOCIETY_ADMIN"]),
    controller.createUser
);

router.get("/societies", authMiddleware, authorize("FOUNDATION"), (req, res) => res.send("Society Module"));

router.get("/payments", authMiddleware, authorize("FINANCE"), (req, res) => res.send("Finance Module"));

router.get("/guards", authMiddleware, authorize("OPERATIONAL"), (req, res) => res.send("Operational Module"));

module.exports = router;