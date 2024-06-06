const router = require('express').Router()
const lessonController = require('../Controllers/lesson.controller');
const { ensureAuth, ensureGuest } = require('../Middleware/auth')

/*
router.get('/', ensureGuest ,(req, res) => {
   // res.render('login')
  })
  */
  router.post('/openai', lessonController.lessonai);
  
module.exports=router;

// api/openai