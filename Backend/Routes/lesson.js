
/*
const express = require('express')
//const passport = require('passport')
const router = express.Router()

const lessonController = require('../Controllers/lesson.controller');
const { ensureAuth, ensureGuest } = require('../Middleware/auth')
// Route to handle login page rendering
router.get('/', ensureGuest, lessonController.renderLogin);

// Route to handle index page rendering after authentication
router.get('/log', ensureAuth, lessonController.renderIndex);

module.exports = router;

*/


const router = require('express').Router()
const { ensureAuth, ensureGuest } = require('../Middleware/auth')

/*
router.get('/', ensureGuest ,(req, res) => {
   // res.render('login')
  })
  */

  
module.exports=router;