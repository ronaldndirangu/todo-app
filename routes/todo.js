const express = require('express');
const Joi = require('joi');
const router = express.Router()
const Todo = require('../database');


const validate = todo => {
  const schema = {
    item: Joi.string().min(3).required(),
  };

  return Joi.validate(todo, schema);
}

router.get('/', (res) => {
  Todo.findAll()
    .then(items => res.json(items))
    .catch(error => res.json({ error: error }))
});

router.post('/', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message});

  Todo.create(req.body)
    .then(item => res.json(item))
    .catch(error => res.json({ error: error }))
});

router.get('/:id', (req, res) => {
  Todo.findAll({
    where: {
      id: parseInt(req.params.id)
    }
  })
    .then(todo => {
      if (todo.length === 1) return res.json(todo)
      return res.status(404).json({ error: 'Item with the given ID not found' });
    })
    .catch(error => res.json({ error: error }))
});

router.put('/:id', (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message});

  Todo.update(
    { item: req.body.item },
    { where: { id: parseInt(req.params.id) }
  })
    .then((updatedItem) => {
      console.log(updatedItem)
      if (updatedItem[0] === 1) return Todo.findAll({ where: { id: req.params.id }})
      return res.status(404).json({ error: 'Item with the given ID not found' })
    })
    .then(item => res.json(item))
    .catch(error => res.json({ error: error }))
});

router.delete('/:id', (req, res) => {
  Todo.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  })
    .then((deletedItem) => {
      if (deletedItem === 1) return Todo.findAll()
      return res.status(404).json({ error: 'Item with the given ID not found' })
    })
    .then(items => res.json(items))
    .catch(error => res.json({ error: error }))
});

module.exports = router;
