const express = require('express');
const todo = require('./routes/todo');
const app = express();

app.use(express.json());
app.use('/api/todo', todo);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});