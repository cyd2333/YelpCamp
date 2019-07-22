var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

router.get("/", function(req, res) {
    // get all of campgrounds from db..
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });

});

router.post("/", middleware.isLoggedIn, function(req, res) {
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username : req.user.username
    }
    var newCampground = {name: name, image:image, description: description, price: price, author: author};
    // store it into db
    Campground.create(newCampground, function(err, allCampground){
        if(err){
            console.log(err);
        } else {
            //redirect 
            res.redirect("/campgrounds");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new.ejs");
});

router.get("/:id", function(req, res) {
    // find specific thing by id....
    // console.log("SHOW UP part is still under construction!");
    Campground.findById(req.params.id).populate("comment").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// ============= Edit and Update Route ============
// Edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    // is user logged in 
    Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground:foundCampground});
    });
});

// Update
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCampground){
        if(err)
            res.redirect("/campgrounds/");
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
})

// Destroy...
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err)
            res.redirect("/campgrounds");
        else 
            res.redirect("/campgrounds");
        
    });
});




module.exports = router;