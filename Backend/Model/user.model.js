//const Sequelize = require('sequelize');
// const Lesson = require('./lesson.model.js');
module.exports= (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: false, // Same as required: true in Mongoose
      },
      displayName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      }
    }, {
      // Model options (optional)
      tableName: 'users' // Explicitly set table name if different
    });
 //   User.hasMany(Lesson); // A HasMany B
    return User;
  };
  