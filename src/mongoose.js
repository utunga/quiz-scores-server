const mongoose = require('mongoose');

module.exports = function (app) {
  mongoose.connect(
    process.env.MONGODB_URI || app.get('mongodb'),
    { useCreateIndex: true, useNewUrlParser: true }
  );
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
