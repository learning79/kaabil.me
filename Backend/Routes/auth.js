const express = require('express')
const passport = require('passport')
const router = express.Router()

const userController = require('../Controllers/user.controller');

router.get('/google', userController.googleAuth);

//router.get('/google/callback', userController.handleGoogleCallback);
//http://localhost:5173
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173/' }),
    (req, res) => {
    //  res.redirect('/log')
     res.redirect("http://localhost:5173/dashboard")
    }
  )

router.get('/logout', userController.logout);

module.exports = router;

// http://localhost:3000/auth//google/callback