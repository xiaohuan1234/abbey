var mongoose    = require("mongoose"),
    MealScheduled = require("./models/meal-scheduled");
    
var dataMealScheduled = [
    {
        dayOfWeek: "Monday",
        name: "Pulled Pork Sandwhich",
        description: "slow roasted pork shoulder, cherry balsamic sauce, cucumber, arugula, mustard seed mayo, acme sweet bun."
    },
    {
        dayOfWeek: "Tuesday",
        name: "Spicy Ramen",
        description: "roasted pork, fried whole garlic, kikurage mushroom, fresh green chives, quail egg, chicken gravy."
    },
    {
        dayOfWeek: "Wednesday",
        name: "Chicken Burrito",
        description: "french fries, cheese guacamole, pico de gallo, sour cream."
    },
    {
        dayOfWeek: "Thursday",
        name: "Beef Club Sandwhich",
        description: "hot roast beef, bomb sauce,cream cheese."
    },
    {
        dayOfWeek: "Friday",
        name: "Nonna’s Polpetta",
        description: "a single large homemade meatball over spaghetti with marinara sauce."
    }
];

function seedDB() {
    MealScheduled.remove({}, function(err, result){
        if(err) {
            console.log("err removing all MEALS.");
            console.log(err);
        } else {
            console.log("successfully removed all meals.");
            // console.log(result);
            MealScheduled.create(dataMealScheduled, function(err, createdMealScheduled){
                if(err) {
                    console.log("err:");
                    console.log(err);
                } else {
                    console.log("successfully created schedules.");
                    // console.log(createdMealScheduled);
                }
            });
        }
    });
}

module.exports = seedDB;