// Initializes the `users` service on path `/users`
const createService = require('feathers-mongoose');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/users', createService(options));

  // Initialize with some default users 
  // FIXME we'll remove this later
  // (Will add if not present, otherwise leaves user list unchanged)
  const service = app.service('users');
  const users = [
    { name: 'Simon' },
    { name: 'Miles'   },
    { name: 'Richard'  },
    { name: 'Yvan'  },
    { name: 'Finlay' }
  ];
  for (let user of users) {
    service.find({ query: { name: user.name } })
    .then( 
      (found) => {
      if (!found.total) {
        service.create(user);
      }}
    );
  }


  service.hooks(hooks);
};
