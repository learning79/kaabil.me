// Define a module that initializes the Course model with Sequelize
module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define('Course', {
      // Define a 'subjectName' field which is used as the primary key
      subjectName: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      subjectDescription: {
        type: Sequelize.STRING,
        allowNull: false,
      }
     
    }, {
      // Model options (optional)
      tableName: 'courses'  // Specify the table name in the database
    
    });

     return Course;  // Return the defined model to be used elsewhere
    
  };
  