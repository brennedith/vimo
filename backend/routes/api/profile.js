const express = require('express');
const router = express.Router();

const { avatarUpload } = require('../../configs/storage');
const { isAuth } = require('../../configs/middlewares');

const User = require('../../models/user');

router.get('/', isAuth, (req, res, next) => {
  const { user } = req;

  res.status(200).json(user);
});

router.post('/', avatarUpload.single('avatar'), isAuth, (req, res, next) => {
  const { _id } = req.user;
  const { name } = req.body;
  const image_url = req.file ? req.file.secure_url : '';

  User.findByIdAndUpdate(
    _id,
    {
      name,
      image_url
    },
    { new: true }
  )
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ err }));
});

module.exports = router;
