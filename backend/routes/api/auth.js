const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../../models/user');

/*
TODO: Add auth
*/

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  User.register({ username }, password)
    .then(user => {
      req.logIn(user, err => {
        if (err) return res.status(500).json(err);

        res.status(200).json(user);
      });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return res.status(403).json(err);

    req.logIn(user, err => {
      if (err) return res.status(500).json(err);

      res.status(200).json(user);
    });
  })(req, res, next);
});

router.get('/', (req, res, next) => {
  const { user } = req;
  if (!user) {
    return res.status(403).json({ message: 'You need to login first.' });
  }

  res.status(200).json(user);
});

router.get('/logout', (req, res, next) => {
  req.logOut();
  res.status(200).json({ message: 'Ok' });
});

module.exports = router;
