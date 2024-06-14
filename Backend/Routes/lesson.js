const router = require('express').Router()
const lessonController = require('../Controllers/lesson.controller');
const { ensureAuth, ensureGuest } = require('../Middleware/auth')
const messageController = require('../Controllers/message.controller');
/*
router.get('/', ensureGuest ,(req, res) => {
   // res.render('login')
  })
  */
  router.post('/openai', lessonController.lessonai);
  router.get('/lessons/',lessonController.getLessons);
  router.get('/lessons/questionType/:type',lessonController.getLessonsByType);

  router.get('/lessons/subject/:subjectName',lessonController.getLessonsBySubjectName);
  router.post('/messages/:LessonId', ensureAuth,messageController.createMessage);
module.exports=router;

// api/openai