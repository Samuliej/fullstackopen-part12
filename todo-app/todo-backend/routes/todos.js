const express = require('express');
const { Todo } = require('../mongo')
const mongoose = require('mongoose');
const router = express.Router();

/* Todo get routes */

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* Todo post routes */

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  // If the id is in wrong format, doesn't crash the server
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).send({ message: 'Invalid ID format' });
  }
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = req.todo;
  if (todo)
    res.status(200).send(todo);
  else
    res.status(404).send({ message: 'Todo not found.' });
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todo = req.todo;
  const modifiedTodo = req.body;
  if (todo) {
    if (modifiedTodo.text)
      todo.text = modifiedTodo.text;
    if (modifiedTodo.done !== undefined)
      todo.done = modifiedTodo.done;
  }
  try {
    await todo.save()
    res.status(200).send(todo)
  } catch (error) {
    res.status(500).send({ message: 'Something went wrong updating the todo.' })
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
