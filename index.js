require('dotenv').config()
const express= require ('express');
const path=require('path');
const router = require('./Routes/user');
const cookieparser=require('cookie-parser');
const { connection } = require('./Connections/user');
const { checkforcookie } = require('./middleware/auth');
const blogrouter = require('./Routes/blog');
const blog = require('./Models/blog');

connection(process.env.MONGO_URL);

const port=process.env.PORT;


const app=express();
//middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkforcookie("token"));
app.use(express.static(path.resolve('./Public')))


//view engine and pages
app.set('view engine', 'ejs');
app.set('views', path.resolve('./Views'));

app.get('/', async(req, res) => {
  const allblog=await blog.find({}).sort('createdAt');
  return res.render('home',{
    user:req.user,
    blog:allblog
  });
}
)


app.use('/blog', blogrouter);
app.use('/user',router )
app.listen(port, () => {
  console.log("App is listening on http://localhost:"+port);
}
)