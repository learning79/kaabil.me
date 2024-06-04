module.exports = {
    ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('http://localhost:5173/')
      //uncomment for production
    // res.redirect('https://www.kaabil.me/')
      }
    },
    ensureGuest: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/http://localhost:5173/dashboard');
      }
    },
  }