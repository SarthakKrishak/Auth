const cookieParser = require("cookie-parser");
const express = require("express")
const app = express();

const jwt = require("jsonwebtoken")
const path = require("path")
const userModel = require("./models/user")
const bcrypt = require("bcrypt")

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


app.get("/", function (req, res) {
    res.render("index")
})

app.post("/create", (req, res) => {
    let { username, email, password, age } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            });
            let token = jwt.sign({ email }, "1234"); 
            res.cookie("token", token)
            res.send(createdUser)
        })
    })

})

app.get("/login", function (req, res) {
    res.render("login")
})
app.post("/login", async (req, res)=> {
    let users = await userModel.findOne({ email: req.body.email })
    if (!users) return res.send("Something went wrong")
    
    bcrypt.compare(req.body.password, users.password, function (err, result) {
        if (result) {
            res.send("yes you can login");
            let token = jwt.sign({ email:user.email }, "1234");
            res.cookie("token", token)
            res.send(createdUser)
        }    
            else res.send("Something went Wrong")
    })
})

app.get("/logout", function (req, res) {
    res.clearCookie("token");
    res.redirect("/");
})

app.listen(3000);
