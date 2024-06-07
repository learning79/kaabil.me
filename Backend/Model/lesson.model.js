// Define a Sequelize model for Lessons
module.exports = (sequelize, Sequelize) => {
  const Lesson = sequelize.define(
    "Lesson",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      question: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      options: {
      //  type: Sequelize.ARRAY(Sequelize.STRING), // Stores an array of strings for multiple choice options
      type: Sequelize.JSONB, 
        // some questions might not have options
      },
      solution: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      reference: {
        // Optional field for additional references, like a textbook page, year of question
        type: Sequelize.TEXT,
      },
      level: {
        type: Sequelize.ENUM("easy", "medium", "hard"), // Restricts the level to specific values
        defaultValue: "easy", // Sets 'easy' as the default difficulty level
      },
      question_type: {
        type: Sequelize.ENUM('comprehension', 'list based', 'mcq'), // New field for the type of question
      },
      comprehension_question: {
        type: Sequelize.TEXT, // New field for comprehension question text
        allowNull: true, // Allows null values as not all questions may be comprehension-based
      },
     
    }, {
      // Model options
      tableName: 'lessons' 
    });
     return Lesson;
    
  };
  
