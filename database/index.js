const Sequelize = require('sequelize');
const TodoModel = require('./todo');

const sequelize = new Sequelize('todo', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const Todo = TodoModel(sequelize, Sequelize);

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created`);
  })

module.exports = Todo;
