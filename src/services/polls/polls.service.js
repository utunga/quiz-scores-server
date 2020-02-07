// Initializes the `polls` service on path `/polls`
const createService = require('feathers-mongoose');
const createModel = require('../../models/polls.model');
const hooks = require('./polls.hooks');
module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/polls', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('polls');
  const users = app.service('users');
  
  const date2020 = new Date(2020,1,3);

  service.findOne({ query: { date: date2020 } })
  .then( 
    poll => {
      console.log("Found existing");
      console.log(poll);
      if (!poll) {
        //FIXME remove this - just for debug 
        console.log(poll);
        service.create({
            score: 9,
            date: new Date(2020,1,3)
        }).then( poll => {
          for (user of [
            { name: 'Simon' },
            { name: 'Miles'   }
          ]) {
            users.find({ query: { name: user.name } })
            .then( found => {
              if (found.total) {
                poll.present.push(found.data[0]._id);
                service.update(poll._id, poll);
              }
              console.log(poll)
            });
          }
        });
      }
    })
    


  // Initialize with some default users 
  // FIXME we'll remove this later
  // (Will add if not present, otherwise leaves user list unchanged)
  


  service.hooks(hooks);
};
