
const db = require('../Model/index.js'); // Adjust the path according to your project structure
const Lesson = db.lesson; 
const processTutoringStep = require("../openai.js");

// Logout function to end the user session and redirect to home page
module.exports.lessonai = async (req, res) => {

  // data = req.body
  
   // prompt_question=data.question
   // prompt_option=data.option
  // prompt_solution=data.prompt_solution
  // prompt_user_input=data.prompt_user_input

/*
   const sessionPrompt = `Question and option: 
   ${prompt_question}
   ${prompt_option}
   
   Answer:
   ${prompt_solution}
   
   
   Use the below style of interaction with the student to help the student solve problems. 
   
   Step 1: We need to make the denominators same. Hence we take the ____ 
   User Input: LCM 
   Step 2: Correct. The LCM of 2 & 3 is ____ 
   User Input: 6
   Step 3: Correct. Now convert each fraction so that the denominator is 6
   User Inputs: 3/6 + 2/6 
   Step 4: Correct. What do you think is the next step?
   User Input: 5/6
   Step 5: Question Solve. Good job.
   
   
   Break down the solution to the question given to you into small and simple steps. The steps are directions given by you and then wait for my response and then based on my response take next step as direction. Try to learn my learning rate based on my responses and break down the solution into steps accordingly. For example, if I am not able to answer even the most simple questions, make the next question very basic. Give me one-sentence feedback about what you think my current learning speed/stage is. Also let me know if I am improving. Wait for my response after each step and make the next step according to my answer. 
   `;
*/

let { userInput, sessionMessages } = req.body;

  // Initialize the session with a prompt if starting
  if (!sessionMessages || sessionMessages.length === 0) {
    sessionMessages = [{
      role: "system",
      content: "You are working on a math problem about trigonometric expressions. The question is: 'For any θ in (π/4, π/2), the expression 3(sin θ - cos θ)^4 + 6(sin θ + cos θ)^2 + 4 sin^6 θ equals 13 minus 4 times the sixth power of cos θ, plus 6 times the square of sin θ times the square of cos θ. Can you attempt to solve it, or would you like a hint on how to start?'"
    }];
  }


  
  try {
    const { systemResponse, sessionMessages: updatedMessages } = await processTutoringStep(userInput, sessionMessages);
    res.json({ systemResponse, updatedMessages });
  } catch (error) {
    console.error('Error during tutoring session:', error);
    res.status(500).send('An error occurred during the tutoring session.');
  }




  

  };
  



  module.exports.getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.findAll();
        console.log("these are the lessons   = ",
          lessons
         )
        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports.gtLessonsByType = async (req, res) => {
  try {
      const { type } = req.params;
      console.log("lessons type = ",type)
      const lessons = await Lesson.findAll({
          where: {
              question_type: type
          }
      });
      console.log("lessons found  = ",lessons)
      res.status(200).json(lessons);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}