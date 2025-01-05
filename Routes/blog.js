const { Router } = require('express');
const blog = require('../Models/blog');
const multer = require('multer');
const path = require('path');
const comment = require('../Models/comment');

const blogrouter = Router();

//creating storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./Public/uploads/`))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}_${file.originalname}`
    cb(null, filename);
  }
})
const upload = multer({ storage: storage })

blogrouter.get('/addblog', (req, res) => {
  return res.render('addblog', {
    user: req.user
  })
}
)

blogrouter.post('/addblog', upload.single("coverimg"), async (req, res) => {
  const { title, body } = req.body;
  let coverImgUrl;
  if (req.file == undefined) {
    coverImgUrl = "";
  }
  else {
    coverImgUrl = `/uploads/${req.file.filename}`;
  }
  console.log(req.file);
  const Blog = await blog.create({
    title,
    body,
    coverimgurl: coverImgUrl,
    createdby: req.user._id
  })

  return res.redirect(`/blog/${Blog._id}`);
}
)

blogrouter.post('/comment/:id', async (req, res) => {
  const Comment = await comment.create({
    content: req.body.content,
    blogid: req.params.id,
    createdby: req.user._id
  })
  return res.redirect(`/blog/${req.params.id}`)
}
)

blogrouter.get('/:id', async (req, res) => {
  const blogdata = await blog.findById(req.params.id).populate('createdby');
  const allcomments = await comment.find({ blogid: req.params.id }).populate('createdby');
  const allblogs = await blog.find();
  return res.render('blog', {
    blogdata,
    allblogs,
    allcomments,
    user: req.user
  })
}
)

module.exports = blogrouter