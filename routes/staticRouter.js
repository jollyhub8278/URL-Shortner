const express = require("express");
const router = express.Router();
const URL = require("../models/url"); // Import your model
const { restrictToLoggedinUserOnly } = require("../middlewares/auth");

router.get('/', restrictToLoggedinUserOnly, async (req, res) => {
    if(!req.user) return res.redirect("/login");
    const allUrls = await URL.find({createdBy : req.user._id});
    return res.render('home',
        { urls: allUrls }
    );
});

router.get("/signup", (req, res)=>{
    return res.render("signup");
});
router.get("/login", (req, res)=>{
    return res.render("login");
});

module.exports = router;
