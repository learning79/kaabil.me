// const { user } = require('./index.js');



//const User = require('./user.model.js')(sequelize, Sequelize, User);
//const User = createUserModel(sequelize);
module.exports = (sequelize, Sequelize) => {
    const Lesson = sequelize.define('Lesson', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      /*
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: User, // Reference the User model
          key: 'id'
        }
      },
      */
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false
      },
      level: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
      }
    }, {
      // Model options (optional)
      tableName: 'lessons' 
    });
   // Lesson.belongsTo(User, { foreignKey: 'userId' });
   // User.hasMany(Lesson); // A HasMany B
   
  // Lesson.belongsTo(User, { foreignKey: 'userId' });
     return Lesson;
    
  };
  