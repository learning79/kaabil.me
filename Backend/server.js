require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./Config/db.config.js");
//const dotenv = require('dotenv')
const path = require('path');
const passport = require('passport')
const session = require('express-session')
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const configurePassport = require('./Controllers/user.controller');
const app = express();

/*
app.use(
	cors({
		origin: "http://localhost:5173",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
*/
app.use(cors())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */
// Serve static files from the React app



//uncomment for production
// app.use(express.static(path.join(__dirname, 'dist')));


/*
const Sequelize = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
  //  createDatabase: true // This will create the database automatically
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const store = new SequelizeStore({
    db: sequelize,
  });

  // Initialize the session
app.use(
    session({
      secret: 'keyboard cat', // Change this to a secure secret
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );
*/


/*
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
*/

// Enable CORS with default options
//app.use(cors());


// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */



const db = require("./Model");

db.sequelize.sync()
  .then(() => {
    console.log("Database connection successful!");
    // Start your server here
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    // Handle the error appropriately (e.g., exit the process)
  });

// Call the imported function with the passport instance
configurePassport(passport);




// Middleware
// app.use(express.urlencoded({extended:true}))
 //app.use(express.static('public'))

 // app.set('view engine','ejs');

 
app.use(
    session({
     secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    //  store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )


  // Passport middleware
app.use(passport.initialize())
app.use(passport.session())



// Body parser middleware to parse JSON requests
//app.use(bodyParser.json());


// Setup dotenv to manage environment variables
//dotenv.config();

// Initialize session middleware
/*
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
 // cookie: { secure: true }
}));
*/


app.use('/api',require("./Routes/lesson"))
app.use('/api/auth', require('./Routes/auth'))


//health check

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
//require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});