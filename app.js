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
app.use(express.static("public"))
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

app.get("/", function(req, res){
    res.redirect("/blogul")
})

app.get("/blogul", function(req, res){
    res.render("index")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Blogul server started at PORT: 3000")
})