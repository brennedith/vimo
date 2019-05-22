const express = require('express');
const router = express.Router();

const { isAuth } = require('../../configs/middlewares');

const User = require('../../models/user');

router.post('/:id', isAuth, (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;

  User.findByIdAndUpdate(
    _id,
    {
      $addToSet: { friends: id }
    },
    { new: true }
  )
    .populate('friends')
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', isAuth, (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;

  User.findByIdAndUpdate(
    _id,
    {
      $pull: { friends: id }
    },
    { new: true }
  )
    .populate('friends')
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err));
});

router.get('/search', isAuth, (req, res, next) => {
  const { _id } = req.user;
  const { q } = req.query;
  const regex = new RegExp(q, 'i');

  if (q === '') {
    return res.status(200).json([]);
  }

  User.find({
    $or: [
      { _id: { $ne: _id }, name: regex },
      { _id: { $ne: _id }, username: regex }
    ]
  })
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
