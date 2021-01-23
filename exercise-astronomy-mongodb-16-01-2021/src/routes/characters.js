const route = require('express').Router();

const Character = require('../models/Character');
const { createBirthDate } = require('../utils/character.utils');

route.post('/', async (req, res, next) => {
  // const newCharacter = new Character(newCharacterData);
  // await newCharacter.save()
  const newCharacter = await Character.create({
    username: req.body.username,
    birthdate: createBirthDate(req.body.birthdate),
  });
  res.status(201).json({ data: newCharacter });
});

module.exports = route;
