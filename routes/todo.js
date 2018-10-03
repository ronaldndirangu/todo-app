const express = require('express');
const Joi = require('joi');
const router = express.Router()

const todos = [
  { id: 1, item: 'Get milk'},
  { id: 2, item: 'Buy gym shorts'},
  { id: 3, item: 'Call the fabricator'},
]

const validate = todo => {
  const schema = {
    item: Joi.string().min(3).required(),
  };

  return Joi.validate(todo, schema);
}

router.get('/', (req, res) => {
  res.send(todos);
});

router.post('/', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  todos.push({
    id: todos.length + 1,
    item: req.body.item,
  })
  res.send(todos)
});

router.get('/:id', (req, res) => {
  const todo = todos.find(item => (item.id === parseInt(req.params.id)))
  if (!todo) return res.status(404).send('Item with given ID not found')
  res.send(todo);
});

router.put('/:id', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = todos.find(item => (item.id === parseInt(req.params.id)))
  if (!todo) return res.status(404).send('Item with given ID not found')

  todo.item = req.body.item;
  res.send(todo);
});

router.delete('/:id', (req, res) => {
  const todo = todos.find(item => (item.id === parseInt(req.params.id)));
  if (!todo) return res.status(404).send('Item with given ID not found');

  const index = todos.indexOf(todo);
  todos.splice(index, 1);
  res.send(todo);
});
module.exports = router;
