


const router = require('express').Router()
const lessonController = require('../Controllers/lesson.controller');
const { ensureAuth, ensureGuest } = require('../Middleware/auth')

/*
router.get('/', ensureGuest ,(req, res) => {
   // res.render('login')
  })
  */
  router.post('/openai', lessonController.lessonai);
  router.get('/lessons/',lessonController.getLessons);
  router.get('/lessons/type/:type',lessonController.gtLessonsByType);
  
module.exports=router;

// api/openai