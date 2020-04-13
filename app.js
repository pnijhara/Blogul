let express = require("express")
let methodOverride = require("method-override")
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
app.use(methodOverride("_method"))

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

//CREATE ROUTE
app.post("/blogul", function(req, res){
	Blogul.create(req.body.blogul, function(err, newblogul){
		if(err){
			res.render('new')
		} else{
			res.redirect("/blogul")
		}
	})
})

//SHOW ROUTE
app.get("/blogul/:id", function(req, res){
    Blogul.findById(req.params.id, function(err, foundblogul){
		if(err){
			console.log(err)
		} else{
			res.render("show", {foundblogul: foundblogul})
		}
	})
})

//EDIT ROUTE
app.get("/blogul/:id/edit", function(req, res){
    Blogul.findById(req.params.id, function(err, foundblogul){
		if(err){
			res.render("/blogul")
		} else{
			res.render("edit", {foundblogul: foundblogul})
		}
	})
})

//UPDATE ROUTE
app.put("/blogul/:id", function(req, res){
    Blogul.findByIdAndUpdate(req.params.id, req.body.blogul, function(err, updatedblogul){
        if(err){
            res.redirect("/blogul")
        } else{
            res.redirect("/blogul/" + req.params.id)
        }
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Blogul server started at PORT: 3000")
})