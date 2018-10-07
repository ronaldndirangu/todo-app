const express = require('express');
const bodyParser = require('body-parser');
const todo = require('./routes/todo');
const app = express();

app.use(bodyParser.json());
app.use('/api/todo', todo);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});