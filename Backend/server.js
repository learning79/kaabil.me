require('dotenv').config(); // Load environment variables from .env file

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./Config/db.config.js");
const path = require('path');
const passport = require('passport')
const session = require('express-session')

const configurePassport = require('./Controllers/user.controller'); // Include the user controller to configure Passport strategies
const app = express();

// Enable CORS with default settings for all origins
 // app.use(cors())

app.use(
	cors({
		origin: "http://localhost:5173",
	//	methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// Serve static files from the React app
//uncomment for production
// app.use(express.static(path.join(__dirname, 'dist')));




// Parse JSON requests using Express built-in middleware
app.use(express.json());  


// Database connection setup
const db = require("./Model");

// Synchronize the Sequelize models with the database
db.sequelize.sync()
  .then(() => {
    console.log("Database connection successful!");
   
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
   
  });

// Call the imported function with the passport instance
// Initialize Passport authentication
configurePassport(passport);




// Middleware
// app.use(express.urlencoded({extended:true}))
 //app.use(express.static('public'))

 // app.set('view engine','ejs');

 
 // Initialize session management with session secret from environment variables
app.use(
    session({
     secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    //  store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )


  app.use(passport.initialize())
app.use(passport.session())





// Initialize session middleware
/*
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
 // cookie: { secure: true }
}));
*/

// Setup API routes
app.use('/api',require("./Routes/lesson"))
app.use('/api/auth', require('./Routes/auth'))


// Simple health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Welcome to Kaabil application." });
});






//uncomment for production
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
/*
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});
*/


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});