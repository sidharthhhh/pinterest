const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/', (req, res) => {
  res.render('index', { title: 'Pinterest' });
});

router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Signup' });
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const newUser = new User({ username, email });

    await User.register(newUser, password);
    
    res.redirect("/signin");
  } catch (error) {
    res.send(error);
  }
});

router.get('/signin', (req, res) => {
  res.render('signin', { title: 'Signin' });
});

router.post("/signin", passport.authenticate("local", {
  failureRedirect: "/signin",
  successRedirect: "/main",
}));

router.get("/main", isLoggedIn, async (req, res) => {
  try {
    console.log(req.user);
    const users = await User.find();
    res.render("main", { title: "Main", users, user: req.user });
  } catch (error) {
    res.send(error);
  }
});

router.get("/signout", isLoggedIn, (req, res) => {
  req.logout();
  res.redirect("/signin");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
}

module.exports = router;
