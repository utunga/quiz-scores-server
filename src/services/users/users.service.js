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

  // Get our initialized service so that we can register hooks
  const service = app.service('users');
  const users = [
    { name: 'Barnaby' },
    { name: 'Linc'   },
    { name: 'Milan'  },
    { name: 'Miles'  },
    { name: 'Sergio'  }
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
