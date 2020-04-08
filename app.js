let express = require("express")
let bodyParser = require("body-parser")
let mongoose = require("mongoose")
app = express()

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/blogul",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}))

//MONGOOSE/MODEL CONFIG
let blogulSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
})

let Blogul = mongoose.model("Blogul", blogulSchema)

// RESTFUL ROUTES
// INDEX ROUTE
app.get("/", function(req, res){
    res.redirect("/blogul")
})

app.get("/blogul", function(req, res){
    Blogul.find({}, function(err, bloguls){
        if(err){
            console.log(err)
        } else{
            res.render("index", {bloguls: bloguls})
        }
    })
})

//NEW ROUTE
app.get("/blogul/new", function(req, res){
    res.render("new")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Blogul server started at PORT: 3000")
})