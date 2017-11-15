const uuid = require('uuid');

let generateMessage = (uid, from, to, text) => ({
  id: uuid(),
  uid,
  from,
  to,
  text,
  createdAt: new Date().getTime()
});

module.exports = { generateMessage };
