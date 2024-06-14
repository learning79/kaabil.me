
const db = require('../Model/index.js'); // Adjust the path according to your project structure
const Message = db.Message;



module.exports.createMessage = async (req, res) => {
    try {
        console.log("request body =",req.body)
      // Extract chat data and other necessary fields from the request body
      const { questionIndex, chats, userInput } = req.body;
      const UserId = req.user.dataValues.id; // Extract UserId from req.user provided by authentication middleware
      console.log("user id =",UserId)
      console.log("lesson id=", req.params)
      const { LessonId } = req.params; // Extract LessonId from URL parameters
  
      // Validation logic can be added here
      if (!UserId || !LessonId || !chats) {
        return res.status(400).json({ message: "UserId, LessonId, and chats are required." });
      }
  
      // Create a new message in the database
      const message = await Message.create({
        questionIndex,
        chats,  // Assuming 'chats' is a structured JSON/JSONB that matches your chat format
        userInput,
        UserId,
        LessonId
      });
  
      console.log("Message created successfully: ", message);
      res.status(201).json(message);
    } catch (error) {
      console.log("Error creating message: ", error);
      res.status(500).json({ error: error.message });
    }
  }
  