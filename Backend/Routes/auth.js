const express = require('express')
const passport = require('passport')
const router = express.Router()

const userController = require('../Controllers/user.controller');
const { ensureAuth, ensureGuest } = require('../Middleware/auth')
router.get('/google', userController.googleAuth);

//router.get('/google/callback', userController.handleGoogleCallback);
//http://localhost:5173
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:3000/' }),
   //uncomment for production

   // passport.authenticate('google', { failureRedirect: 'https://www.kaabil.me/' }),
    (req, res) => {
    //  res.redirect('/log')
     res.redirect("http://localhost:3000/dashboard")
   //uncomment for production
    //   res.redirect("https://www.kaabil.me/dashboard")
    }
  )

router.get('/logout', userController.logout);



// auth/login/sucess
router.get("/login/sucess",ensureAuth, async(req,res)=>{
  //  res.render('index',{userinfo:req.user})
  if (req.user) {
    res.status(200).json({
        error: false,
        message: "Successfully Loged In",
        user: req.user,
    });
    console.log("req user = ",req.user)
} else {
    res.status(403).json({ error: true, message: "Not Authorized" });
}
})

module.exports = router;

// http://localhost:3000/auth//google/callback