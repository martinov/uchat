const uuid = require('uuid');

let generateMessage = (from, to, text) => ({
  id: uuid(),
  from,
  to,
  text,
  createdAt: new Date().getTime()
});

module.exports = { generateMessage };
