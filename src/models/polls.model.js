// polls-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const mongoose = require('mongoose');

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const polls = new Schema({
    score: { type: Number },
    out_of:  { type: Number, default: 10 },
    date: { type: Date, required: true  },
    present: [mongoose.Types.ObjectId]
  }, {
    timestamps: true
  });

  return mongooseClient.model('polls', polls);
};
