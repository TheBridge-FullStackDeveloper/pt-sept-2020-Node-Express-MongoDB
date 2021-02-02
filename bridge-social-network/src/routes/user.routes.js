const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const { isValidPassword, throwError } = require('../utils/common.utils');
const { isLoggedIn } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/profile', [isLoggedIn], async (req, res, next) => {
  // Como ahora tenemos authentication podemos sacar el user de req.user cuando esté logeado
  const id = req.user._id;

  // Este código lo usábamos para carga la información antes de tener auth
  // const { userId } = req.params;
  // if (!userId) {
  //   return throwError('Invalid or missing id', 422)(next);
  // }

  try {
    // Con populate me traigo los documentos de la DB que tengan esas ids del array
    const user = await User.findById(id).populate([
      {
        path: 'follows',
        select: {
          alias: 1,
          bio: 1,
          username: 1,
        },
      },
      {
        path: 'followers',
        select: {
          alias: 1,
          bio: 1,
          username: 1,
        },
      },
      {
        path: 'tweets',
        // Podemos elegir los campos a castear
        select: {
          textContent: 1,
          likes: 1,
          createdAt: 1,
        },
        options: {
          // Podemos usar sort para ordenar los populates
          sort: {
            createdAt: -1,
          },
          // Podemos limitar la cantidad de elementos
          skip: 1, // Skip va antes que limit
          limit: 2, // Limit limita el número de elementos que traigo
        },
      },
      // Estamos populando un campo virtual a pesar de no "existir" en el modelo
      {
        path: 'myTweets',
        select: {
          textContent: 1,
          likes: 1,
          createdAt: 1,
        },
      },
    ]);

    res.status(200).json({
      data: {
        user,
      },
    });
  } catch (err) {
    return throwError('Invalid or missing id', 422)(next);
  }
});

// POST DE REGISTRO TEMPORAL ⏰
router.post('/', async (req, res, next) => {
  const { username, alias, email, password, bio } = req.body;

  if (!isValidPassword(password)) {
    return throwError('Invalid password format', 422)(next);
  }

  try {
    const newUser = await User.create({
      username,
      alias,
      email,
      // Encriptamos el password antes de mandarlo a la DB
      password: bcrypt.hashSync(password, 12),
      bio,
    });

    res.status(201).json({ data: newUser });
  } catch (err) {
    return throwError('Error creating user (duplicate keys)', 409)(next);
  }
});

router.put('/follow/:userId', async (req, res, next) => {
  const { userId } = req.params;
  // Como no estamos logeados, mandamos nuestra id en el body y el password
  // para simular una autenticación
  const { myId, password } = req.body;

  // Esto NO haría falta con autenticación ⏬
  const myUser = await User.findById(myId, { password: 1, follows: 1 });
  const myPassword = myUser.get('password');
  if (!bcrypt.compareSync(password, myPassword)) {
    return throwError('Invalid password and email', 401)(next);
  }
  // Fin de lo que no haría falta ⏫

  // 1. Comprobar que NO estoy en los followers del user
  const userToFollow = await User.findById(userId, { followers: 1 });

  const hasMeInFollowers = userToFollow.get('followers').includes(myId);
  // Actualizo los followers de la persona que quiero seguir
  await User.findByIdAndUpdate(
    userId,
    hasMeInFollowers
      ? {
          $pull: { followers: myId },
        }
      : {
          $push: { followers: myId },
        }
  );

  // 2. Buscar que no tengo al usuario en mis Follows
  const isUserFollowed = myUser.get('follows').includes(userId);
  // Actualizo mis follows
  const myUpdatedUser = await User.findByIdAndUpdate(
    myId,
    isUserFollowed
      ? {
          $pull: { follows: userId },
        }
      : {
          $push: { follows: userId },
        },
    { new: true }
  );

  res.status(200).json({ data: myUpdatedUser });
});

module.exports = router;
