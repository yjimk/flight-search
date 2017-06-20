'use strict';

const Boom = require('boom');
const AirlineService = require('../services/airlines');

module.exports = function () {
  return function (request, reply) {
    return AirlineService.findAll()
      .then(airlines => {
        if (!airlines) {
          return reply(Boom.badImplementation());
        }
        return reply(airlines).code(200)
          .header('x-csrf-token', request.server.plugins.crumb.generate(request, reply))
          .header('Content-Type', 'application/json');
      })
      .catch(err => reply(Boom.badImplementation(err)));
  };
};
