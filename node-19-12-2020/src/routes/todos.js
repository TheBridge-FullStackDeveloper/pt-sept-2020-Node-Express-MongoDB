const { Router } = require('express');
const uuid = require('uuid').v4;

const { readFile, writeFile } = require('../utils/file');

const router = Router();

router.get('/', (req, res, next) => {
  try {
    const todos = readFile('../db/todos.json')(__dirname);

    res.status(200).json({
      ok: true,
      data: todos
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    const newTodo = {
      id: uuid(),
      title,
      description,
      category
    };

    const todos = readFile('../db/todos.json')(__dirname);

    const payload = [...todos, newTodo];
    writeFile('../db/todos.json', payload)(__dirname);

    res.status(200).json({
      ok: true,
      data: payload
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
