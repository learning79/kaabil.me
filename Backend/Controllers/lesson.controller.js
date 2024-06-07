
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
    
   Take SMALL STEPS!
   Break down the solution to the question given to you into small and simple steps. The steps are directions given by you and then wait for my response and then based on my response take next step as direction. Try to learn my learning rate based on my responses and break down the solution into steps accordingly. For example, if I am not able to answer even the most simple questions, make the next question very basic. Give me one-sentence feedback about what you think my current learning speed/stage is. Also let me know if I am improving. Wait for my response after each step and make the next step according to my answer. 
   `;
*/

let { userInput, sessionMessages } = req.body;

  // Initialize the session with a prompt if starting
  if (!sessionMessages || sessionMessages.length === 0) {
    sessionMessages = [{
      role: "system",
      content: `Give step by step solution to the given
      . GIVE THE OUTPUT in MATHS and not LATEX so convert the given question to english/maths with proper spacing
      question: " For any \\(\\theta \\in (\\pi/4, \\pi/2)\\), the expression \\(3(\\sin \\theta - \\cos \\theta)^4 + 6(\\sin \\theta + \\cos \\theta)^2 + 4 \\sin^6 \\theta\\) equals:",
      options: {
        a: "13 - 4 \\cos^2 \\theta + 6 \\sin^2 \\theta \\cos^2 \\theta",
        b: "13 - 4 \\cos^6 \\theta",
        c: "13 - 4 \\cos^2 \\theta + 6 \\cos^4 \\theta",
        d:"13 - 4 \\cos^4 \\theta + 2 \\sin^2 \\theta \\cos^2 \\theta"
      
      },
      solution: "b",
      answer in small steps without revealing the answer to the students. reveal each step in each interaction only ask students questions to answer which lead them to the actual answer. You are a teaching assistant.
      `
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