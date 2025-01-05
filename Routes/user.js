const {Router}= require('express');
const user=require('../Models/user');
const multer=require('multer');
const router=Router();
const path=require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./Public/image/`))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}_${file.originalname}`
    cb(null, filename);
  }
})
const Profileimg = multer({ storage: storage })


router.get('/signin', (req, res) => {
  return res.render('signin');
}
)

router.get('/signup', (req, res) => {
  return res.render('signup');
}
)
router.post('/signup', Profileimg.single("profileimgfront"),async(req, res) => {
  const fullname=req.body.fullname;
  const email=req.body.email;
  let profile;
  let coverImgUrl;
  if (req.file == undefined) {
    profile = "";
  }
  else {
    profile = `/uploads/${req.file.filename}`;
  }
  const password=req.body.password;
  await user.create({
    fullname,
    email,
    password,
    profileimg:profile
  })
  return res.redirect('/user/signin');
}
)

router.post('/signin', async(req, res) => {
  const {email, password}=req.body;
  try {
    const token=await user.matchpassword(email, password);
    return res.cookie('token', token).redirect('/');
  } catch (error) {
    return res.render('signin', {error: 'Incorrect Email or Password! Check your details and try to Login back'})
  }
 
}
)

router.get('/logout', (req, res) => {
  return res.clearCookie("token").redirect('/');
}
)


module.exports=router