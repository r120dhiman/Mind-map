const {Router}= require('express');
const user=require('../Models/user');

const router=Router();

router.get('/signin', (req, res) => {
  return res.render('signin');
}
)

router.get('/signup', (req, res) => {
  return res.render('signup');
}
)
router.post('/signup',async(req, res) => {
  const fullname=req.body.fullname;
  const email=req.body.email;
  const password=req.body.password;
  await user.create({
    fullname,
    email,
    password
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