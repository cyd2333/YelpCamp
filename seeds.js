var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "RiverSide",
        image: "https://farm9.staticflickr.com/8020/7538732802_49a42d28d2.jpg",
        description: "blah balh...."
    },
    {
        name: "OakHill",
        image: "https://farm7.staticflickr.com/6009/5933610064_e587c3ea9c.jpg",
        description: "blah balh...."
    },
    {
        name: "Aurora",
        image: "https://farm3.staticflickr.com/2502/3839019100_2ff870e2f0.jpg",
        description: "blah balh...."
    }
]



function seedDB() {
    // Remove all Campground
    /* 
    Comment.remove({}, function(err){
        if(err)
            console.log(err);
    });
    */
   
    Campground.remove({}, function(err){
        /** 
        if(err)
            console.log(err);
        else{
            
            console.log("remove all data in campground....");
            data.forEach(function(seed){
                Campground.create(seed, function(err, camp){
                    if(err)
                        console.log(err);
                    else
                        console.log("added a new data into DB...");
                        // create a comment
                        Comment.create({
                            text: "this palce is great! No water!!! No shower!!",
                            author: "dongdong~"
                        }, function(err, comment){
                            if(err)
                                console.log(err);
                            else {
                                camp.comment.push(comment);
                                camp.save();
                                console.log("created new comment..");
                            }
                        });
                });
            });
        }
        */
    });
    // add some data
    
}

module.exports = seedDB;