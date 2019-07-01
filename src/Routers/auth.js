const express = require("express");
const passport = require("passport")

const router = express.Router();
const User = require("../models/user");

/* GET home page. */

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("info", "You must be logged in to see this page.");
    res.redirect("/login");
  }
}

router.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});


router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

// module.exports = passport => {
//   router.post("/signup", (req, res) => {
//     const { username, password } = req.body;

//     User.findOne({ username }, (err, doc) => {
//       if (err) {
//         res.status(500).send("error occured");
//       } else {
//         if (doc) {
//           res.status(500).send("error occured");
//         } else {
//           const record = new User();

//           record.username = username;
//           record.password = record.hashPassword(password);
//           record.save((err, user) => {
//             if (err) {
//               res.status(500).send("db error");
//             } else {
//               res.send(user);
//             }
//           });
//         }
//       }
//     });
//   });

  // router.post('/login', passport.authenticate('local',{
  //     failureRedirect:'/login',
  //     successRedirect: '/profile'
  // }), (req , res )=>{
  //     res.send("hey ")
  // })
  router.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    successFlash: "welocome wellay",
    failureFlash: true
  }));
  
  router.get("/logout", function(req, res) {
    req.logout();
    res.send({logout: true});
  });

  router.post("/signup", function(req, res, next) {

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {

    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/signup");
    }

    var newUser = new User({
      username: username,
      password: password
    });
    newUser.save(next);

  });
}, passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/signup",
  failureFlash: true
}));


module.exports = router;
