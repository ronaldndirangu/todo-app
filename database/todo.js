module.exports = (sequalize, type) => {
  return sequalize.define('todo', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    item: type.STRING
  })
}