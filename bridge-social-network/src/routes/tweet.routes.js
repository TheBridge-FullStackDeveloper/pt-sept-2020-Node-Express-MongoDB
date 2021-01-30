const express = require('express');

const Tweet = require('../models/Tweet');
const User = require('../models/User');
const { throwError } = require('../utils/common.utils');

const router = express.Router();

router.get('/user/:userId', async (req, res, next) => {
  const { userId } = req.params;

  try {
    const tweetsFromUser = await Tweet.find({ author: userId });

    res.status(200).json({
      data: {
        tweets: tweetsFromUser,
        total: tweetsFromUser.length,
      },
    });
  } catch (err) {
    return throwError('A valid id field is required', 422)(next);
  }
});

router.post('/', async (req, res, next) => {
  const { textContent, userId } = req.body;

  if (!userId) {
    return throwError('An id field is required', 422)(next);
  }

  const user = await User.findById(userId, { _id: 1 });

  if (!user) {
    return throwError('No user', 401)(next);
  }

  try {
    const newTweet = await Tweet.create({
      textContent,
      author: userId,
    });

    // Actualizamos el array de tweets del user
    await user.updateOne({
      $push: {
        tweets: newTweet._id,
      },
    });

    res.status(201).json({ data: newTweet });
  } catch (err) {
    return throwError('No user', 409)(next);
  }
});

module.exports = router;
