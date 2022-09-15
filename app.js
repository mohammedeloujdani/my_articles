//  to controll ur website

const express = require("express");
const app = express();
const port = 5000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//code to give all router from all-article.js on variable 
const allArticlesRouter=require('./routes/all-articles');


// for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// mongoose // connect MongoDB to express js with node js
const mongoose = require("mongoose");
const { render } = require("ejs");

mongoose
  .connect(
    "mongodb+srv://articles:10veryfun@cluster0.aoyvysa.mongodb.net/all-data?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });



  //Express Router

//change title page cheked
app.get("/add-new-article", (req, res) => {
  res.render("add-new-article",{title:"Add Articles"});
});

//redirect to auther Url
app.get("/", (req, res) => {
  res.redirect("/all-articles");
});

//all-articles Path (Router)
app.use('/all-articles',allArticlesRouter)

//get data
//  404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});
