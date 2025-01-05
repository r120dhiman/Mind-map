const {Schema, model}= require('mongoose');
const commentSchema= new Schema({
    content:{
        type:String,
        required:true
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:"user", 
    },
    blogid:{
        type:Schema.Types.ObjectId,
        ref:"blog", 
    }
}, {timestamps:true});


const comment=model("comment",commentSchema );


module.exports=comment;