const express = require("express");
const path = require("path");
const fs=require("fs")
const app = express();

const mongoose = require('mongoose');
const bodyparser = require("body-parser");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
const port = 8000;
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    email: String,
    desc: String,
  });

  const Contact = mongoose.model('Contact', contactSchema);
////Express Specific Stuff////
app.use('/static', express.static('static'))
app.use(express.urlencoded())

////PUBG SPECIFIC STUFF////
// Set the template engine as pug
app.set('view engine', 'pug')

// Set the views directory
app.set('views', path.join(__dirname, 'views'))
 
////ENDPOINT////
app.get("/",(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params)
});

app.get("/contactDance",(req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params)
});
app.post("/contact", (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})})

////START THE SERVER////
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
}); 
