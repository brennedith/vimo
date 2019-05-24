const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const { ObjectId } = mongoose.Types.ObjectId;

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
    to: rawTo,
    type,
    content: rawContent,
    frontCamera,
    expiry,
    longitude,
    latitude
  } = req.body;
  let to;
  let content;

  if (type === 'text') {
    to = rawTo;
    content = {
      ...rawContent,
      type
    };
  } else {
    to = rawTo.split(',');
    content = {
      type,
      frontCamera: Boolean(frontCamera),
      mediaURL: req.file.secure_url
    };
  }

  const post = {
    from: _id,
    content,
    //expiry, //TODO: Add expiry type conversion and validation
    loc: {
      type: 'Point',
      coordinates: [Number(longitude), Number(latitude)]
    }
  };

  const posts = to.map(rawTo => {
    if (rawTo === 'public') {
      return post;
    } else {
      return {
        ...post,
        to: rawTo
      };
    }
  });

  Post.create(posts)
    .then(posts => {
      const populatedPostsPromises = posts.map(post => {
        return post.populate(['to', 'from']).execPopulate();
      });

      Promise.all(populatedPostsPromises).then(posts => {
        res.status(200).json(posts);
      });
    })
    .catch(err => res.status(500).json(err));
}

/* READ: All user created posts */
router.get('/sent', isAuth, (req, res, next) => {
  const { _id } = req.user;

  Post.find({
    from: _id,
    expiry: { $gt: new Date() }
  })
    .populate('to')
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json(err));
});

/* READ: All posts sent to the user */
router.get('/received', isAuth, (req, res, next) => {
  const { _id } = req.user;

  Post.find({
    to: _id,
    expiry: { $gt: new Date() }
  })
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

/* READ: All public posts  */
router.post('/nearby', isAuth, (req, res, next) => {
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
        maxDistance: 1000,
        query: {
          $and: [
            { from: { $ne: _id } },
            { to: { $exists: false } },
            { expiry: { $gt: new Date() } }
          ]
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
  ])
    .then(posts => {
      const responsePosts = posts.map(post => {
        post.from = post.from[0];
        post.from.name = `${post.from.name} (Public)`;

        return post;
      });

      res.status(200).json(responsePosts);
    })
    .catch(err => res.status(500).json(err));
});
/* READ: An specific post */
router.post('/:id', isAuth, (req, res, next) => {
  const { id } = req.params;
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
        maxDistance: 1000,
        query: {
          $and: [
            { $or: [{ from: _id }, { to: _id }, { to: { $exists: false } }] },
            { _id: ObjectId(id) },
            { expiry: { $gt: new Date() } }
          ]
        }
      }
    }
  ])
    .then(posts => res.status(200).json(posts[0]))
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
