const express = require('express')
const router = express.Router()
//code for present schema(model or table) on app.js
const Article = require("../models/articleSchema");




//change title page cheked and get data
//arrArticle = result = table on base de donne
router.get("/", (req, res) => {

Article.find()
.then( (result) => {    res.render("index",{title:"all article",arrArticle:result});     }) 
.catch( (err) => {console.log(err)})

});


router.post("/", (req, res) => {
    const article = new Article(req.body);

    article
    .save( )
    .then( result => {
        res.redirect("/all-articles");
    })
    .catch( err => {
        console.log(err);
    });
});

  //show article or get data from mongodb by id
router.get("/:id",(req,res) => {

    Article.findById(req.params.id)
    .then(result1 =>{ 
    //code to run deatils page and give object named title and give add result1 to objaArticle from detaials
    res.render("details",{title:"Details Article",objArticle:result1})
    ;})
    .catch(err =>{console.log(err)})
    
});

  //Delete Request
router.delete("/:id",(req,res) => {
    
    Article.findByIdAndDelete(req.params.id)
    //code declare object about redirect to next url after delete element 
    .then((params) => {res.json({Link:"/all-articles"})})
    .catch((err) => {console.log(err)})
    
});

module.exports=router