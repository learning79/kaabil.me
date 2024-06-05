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
        type: Sequelize.STRING,
        allowNull: false,
      },
      options: {
        type: Sequelize.ARRAY(Sequelize.STRING), // Stores an array of strings for multiple choice options
        // some questions might not have options
      },
      solution: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reference: {
        // Optional field for additional references, like a textbook page, year of question
        type: Sequelize.STRING,
      },
      level: {
        type: Sequelize.ENUM("easy", "medium", "hard"), // Restricts the level to specific values
        defaultValue: "easy", // Sets 'easy' as the default difficulty level
      },
    },
    {
      // Model options (optional)
      tableName: "lessons",
    }
  );
  return Lesson;
};
