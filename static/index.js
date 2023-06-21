// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true,useUnifiedTopology:true});

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error: '));

db.once('open',function(){
    console.log("We are connected bro/sis")
});

var kittySchema = new mongoose.Schema({
    name: String
});

kittySchema.methods.speak=function(){
    var greeting ="My name is "+this.name
    console.log(greeting);
}
var Kitten=mongoose.model('harryKitty',kittySchema);

var harrykitty= new Kitten({ name: 'harryKitty' });
//console.log(harrykitty.name); // 'Silence'

harrykitty.save(function (err,fluffy){
    if (err) return console.error(err);
    //harrykitty.speak();
});

Kitten.find({name:"harryKitty"},function(err,kittens){
    if (err) return console.error(err);
    console.log(kittens);
})
