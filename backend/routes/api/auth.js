const express = require('express');
const passport = require('passport');
const router = express.Router();

const { isAuth } = require('../../configs/middlewares');

const User = require('../../models/user');

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  User.register({ username, name: username }, password)
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
    if (err) {
      return res.status(403).json({ message: 'Sorry, there was an error' });
    }

    req.logIn(user, err => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'Incorrect username or password.' });
      }
      res.status(200).json(user);
    });
  })(req, res, next);
});

router.get('/logout', isAuth, (req, res, next) => {
  req.logOut();
  res.status(200).json({ message: 'Ok' });
});

module.exports = router;
