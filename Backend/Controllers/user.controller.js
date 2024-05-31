const passport = require('passport')
const db = require("../Model");
const User = db.user;
const GoogleStrategy = require('passport-google-oauth20').Strategy



module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google 
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value
        }

        try {
            // Find the user in our database
            let user = await User.findOne({ where: { googleId: profile.id } });
          
            if (user) {
              // If user present in our database.
              done(null, user);
            } else {
              // If user is not present in our database, save user data to database.
              user = await User.create(newUser);
              done(null, user);
            }
          } catch (err) {
            console.error(err);
          }

      
      }
    )
  )

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });
} 



module.exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });


/*
async function handleGoogleCallback(req, res) {
    try {
      await passport.authenticate('google', { failureRedirect: '/' })(req, res,next);
      res.redirect('/log'); // Redirect to desired location after successful authentication
    } catch (error) {
      console.error('Error during Google authentication callback:', error);
      res.status(500).send('Internal Server Error'); // Handle errors appropriately
    }
    
  }*/

module.exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

// module.exports = handleGoogleCallback;