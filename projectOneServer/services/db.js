const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/ProjectOne',()=>{
    console.log("connected to MongoDB");
})

const Book = mongoose.model('Book',{
    id:Number,
   title:String,
   authors:{
    name:String,
    birth_year:Number,
    death_year:Number
    } ,
   subjects:String,
   formats:{
    text:String,
   application:String,
   image:String
   }
});


const User = mongoose.model('User', {
    acno:Number,
    username:String,
    pass:String
})

module.exports ={
    Book,User
}