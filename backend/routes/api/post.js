const express = require('express');
const router = express.Router();

const { isAuth } = require('../../configs/middlewares');
const { imageUpload, videoUpload } = require('../../configs/storage');

const Post = require('../../models/post');

/* CREATE: Post types: text, video, photo*/
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

/* READ: All user created posts */
router.get('/sent', isAuth, (req, res, next) => {
  const { _id } = req.user;

  Post.find({ from: _id }) //TODO: Return only active posts
    .populate('to')
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json(err));
});

/* READ: All posts sent to the user */
router.get('/received', isAuth, (req, res, next) => {
  const { _id } = req.user;

  Post.find({ to: _id }) //TODO: Return only active posts
    .populate('from')
    .then(posts => {
      // Filters post information
      filteredPosts = posts.map(post => {
        const { _id, from, status, loc, expiry, content, createdAt } = post;

        return {
          _id,
          from,
          status,
          loc: {
            coordinates: loc.coordinates
          },
          expiry,
          content: {
            type: content.type
          },
          createdAt
        };
      });

      res.status(200).json(filteredPosts);
    })
    .catch(err => res.status(500).json(err));
});

/* READ: All public posts and posts sent to user */
router.get('/nearby', isAuth, (req, res, next) => {
  const { longitude, latitude } = req.body;
  const { _id } = req.user;

  Post.aggregate([
    {
      // Finds nearby posts
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        distanceField: 'distance',
        spherical: true,
        maxDistance: 500,
        query: {
          $or: [{ to: _id }, { to: { $exists: false } }]
        }
      }
    },
    {
      // Populates "from"
      $lookup: {
        from: 'users',
        localField: 'from',
        foreignField: '_id',
        as: 'from'
      }
    }
  ]) //TODO: Return only active posts
    .then(posts => res.status(200).json(posts))
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
