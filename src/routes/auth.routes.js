const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
    res.status(201).json({
        message: "User Created",
    });
});

router.post("/login", (req, res) => {
    res.status(201).json({
        message: "User logged",
    });
});

module.exports = router;