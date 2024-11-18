const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
app.use(cookieParser());

app.get("/", function (req, res) {
    res.cookie("name", "Sarthak");
    res.send("Done")
})
app.get("/read", function (req, res) {
    res.send("Read Page")
    console.log(req.cookies);
})

app.listen("3000");