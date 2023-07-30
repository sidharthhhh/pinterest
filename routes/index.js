const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// GET home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Pinterest' });
});

// GET signup page
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Signup' });
});

// POST signup form
router.post('/signup', async (req, res) => {
  try {
    // console.log("hello")
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect("/signin");
  } catch (error) {
    res.status(500).send("Error while signing up: " + error.message);
  }
});

// GET signin page`
router.get('/signin', (req, res) => {
  res.render('signin', { title: 'Signin' });
});

// POST signin form
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send(`User not found. <a href="/signup">Sign up</a>`);
    }

    if (user.password !== password) {
      return res.send(`Incorrect password. <a href="/signup">Sign up</a>`);
    }

    res.render("main");
    // res.send("hellooooo")
  } catch (error) {
    res.status(500).send("Error while signing in: " + error.message);
  }
});

module.exports = router;
