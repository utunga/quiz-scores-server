
const users = require('./users/users.service.js');
const polls = require('./polls/polls.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(polls);
};
