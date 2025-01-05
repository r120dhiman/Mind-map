const {Schema, model}= require('mongoose');

const blogschema= new Schema({
        title:{
            type:String,
            required:true
        },
        body:{
            type:String,
            required:true
        },
        coverimgurl:{
            type:String,
        },
        createdby:{
            type:Schema.Types.ObjectId,
            ref:"user",
            
        }
}, {timestamps:true});


const blog=model("blog_data",blogschema );


module.exports=blog;