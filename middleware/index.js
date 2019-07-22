
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err) {
                req.flash("error", "Campground cannot be found...")
                res.redirect("back");
            }  
            else{
                //does user own the campground?
                //!!!! foundCampground.author.id is mongoose's object
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                }
                else{
                    req.flash("error", "you do not permission to do that...")
                    res.redirect("back");
                }
            }
        })
    } else {
        // move back....
        req.flash("error", "you need to login to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req,res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err)
                res.redirect("back");
            else{
                //does user own the campground?
                //!!!! foundCampground.author.id is mongoose's object
                if(foundComment.author.id.equals(req.user._id))
                    next();
                else{
                    req.flash("error","you don't have permission to do that...")
                    res.redirect("back");
                }
            }
        })
    } else {
        // move back....
        req.flash("error", "you need to login to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
        // before redirect into next route...
        // key and value 
        req.flash("error", "You need to log in to do further operation!");
        res.redirect("/login");
}

module.exports = middlewareObj