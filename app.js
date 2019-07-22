var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");
var methodOverride = require("method-override");
var flash = require("connect-flash");
// var Comment = require("./models/comment");
// var User = require("./models/user");

// seedDB();
// PASSWORD CONFIGURATION
app.use(require("express-session")({
    secret: "Once again This is good WebApp!!!",
    resave: false,
    saveUninitialized: false
}));

app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    // before redirect into next route...
    // key and value
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+"/public"));
app.set("view engine", "ejs");

// connect
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

// listen for user's input
app.listen(3000, function(){
    console.log("The Yelp Camp start!!");
});
