const express = require('express');
const router = express.Router();

const Message = require('../../models/message');

/*
TODO: Add auth
*/

router.post('/', (req, res, next) => {
  const { to, from, content, expiry, longitude, latitude } = req.body;

  Message.create({
    to,
    from,
    content,
    //expiry, //TODO: Add expiry type conversion and validation
    loc: {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  })
    .then(message => res.status(200).json(message))
    .catch(err => res.status(500).json(err));
});

router.get('/', (req, res, next) => {
  Message.find() //TODO: Return only active messages
    .then(message => res.status(200).json(message))
    .catch(err => res.status(500).json(err));
});

router.patch('/:id', (req, res, next) => {
  // V1: Users will not be allowed to update messages
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Message.findByIdAndDelete(id)
    .then(message => {
      if (!message) {
        return res
          .status(404)
          .json({ message: 'That message does not exists.' });
      }

      res.status(200).json(message);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
