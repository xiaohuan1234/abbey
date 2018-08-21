var 
    // general requires (6)
    express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    methodOverride          = require("method-override"),
    flash                   = require("connect-flash"),
    
    // authentication requires (4)
    expressSession          = require("express-session"),
    passport                = require("passport"),
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    
    // local requires including models and routes
    MealScheduled              = require("./models/meal-scheduled"),
    User                    = require("./models/user"),
    Seed                    = require("./seed"),
    userRoutes              = require("./routes/users"),
    campgroundRoutes        = require("./routes/campgrounds"),
    moment = require('moment');
    moment().format();
    
var databaseUrl = process.env.DATABASEURL || "mongodb://localhost:27017/abbey";
mongoose.connect(databaseUrl, { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");

app.use(expressSession({
    secret: "A statement",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


function nextWeek() {
    
    let today     = moment(new Date());




    var daysUntilNextMonday = 8 - today.weekday();
    
    let nextMonday  = moment(new Date()).add(daysUntilNextMonday,'days');
    
    console.log("today is " + today.format("dddd, MMMM Do YYYY"));
    console.log("nextMonday is " + nextMonday.format("dddd, MMMM Do YYYY"));
    var nextWeek = [];
    for(var i=0; i<5; i++) {
        nextWeek[i]= moment(new Date()).add(daysUntilNextMonday+i,'days').format("dddd, MMMM Do YYYY");
    }
    return nextWeek;
}
// app.use(userRoutes);
/*app.use("/mealScheduled", mealScheduledRoutes);*/

Seed();

app.get("/", function(req, res){
    // console.log("home getter!!");
    // res.send("hi");
    MealScheduled.find({}, function(err, results) {
        
        var nextWeekDays = nextWeek();
        if(!err) {
            // console.log("found meals:");
            // console.log(results);
            
            results.forEach(function(meal){
               console.log(meal.dayOfWeek);
            });
            res.render("landing", {mealScheduled: results, nextWeekDays: nextWeekDays});
        } else {
            console.log("error");
            req.flash("error", err.message);
            res.send("meals error!");
        }
    });
});


app.listen(process.env.PORT,process.env.IP, function(){
    console.log("abbey server started...");
});