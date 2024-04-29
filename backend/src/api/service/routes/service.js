"use strict";

/**
 * service router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::service.service", {
  config: {
    find: {
      middlewares: ["api::service.service-populate-middleware"],
    },
    findOne: {
      middlewares: ["api::service.service-populate-middleware"],
    },
  },
});
