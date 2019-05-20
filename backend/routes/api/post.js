const express = require('express');
const router = express.Router();

const { isAuth } = require('../../configs/middlewares');
const { imageUpload, videoUpload } = require('../../configs/storage');

const Post = require('../../models/post');

router.post('/text', isAuth, newPost);
router.post('/video', isAuth, videoUpload.single('media'), newPost);
router.post('/photo', isAuth, imageUpload.single('media'), newPost);
function newPost(req, res, next) {
  const { _id } = req.user;
  const {
    to,
    type,
    content: rawContent,
    frontCamera,
    expiry,
    longitude,
    latitude
  } = req.body;
  let content;

  if (type === 'text') {
    content = {
      type,
      ...rawContent
    };
  } else {
    content = {
      type,
      frontCamera: Boolean(frontCamera),
      mediaURL: req.file.secure_url
    };
  }

  Post.create({
    to,
    from: _id,
    content,
    //expiry, //TODO: Add expiry type conversion and validation
    loc: {
      type: 'Point',
      coordinates: [Number(longitude), Number(latitude)]
    }
  })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(err));
}

router.get('/', isAuth, (req, res, next) => {
  const { _id } = req.user;

  Post.find({ from: _id }) //TODO: Return only active posts
    .populate(['from', 'to'])
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', isAuth, (req, res, next) => {
  const { id } = req.params;
  Post.findByIdAndDelete(id)
    .then(post => {
      if (!post) {
        return res.status(404).json({ post: 'That post does not exists.' });
      }

      res.status(200).json(post);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
