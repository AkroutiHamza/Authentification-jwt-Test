const mongoose =require('mongoose'); 

const UserSchema = new mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId ,
    email:{
        type:String
    }, 
    password:{
        type :String,
        required:true 
    },
    date:{
        type:Date,
        default:Date.now()
        
    }
});
module.exports = mongoose.model('User',UserSchema); 