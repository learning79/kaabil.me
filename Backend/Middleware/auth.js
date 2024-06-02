module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('http://localhost:3000/')
      //uncomment for production
    // res.redirect('https://www.kaabil.me/')
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/http://localhost:3000/dashboard');
      }
    },
  }