'use strict';

/**
 * news router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter("api::news.news", {
  config: {
    find: {
      middlewares: ["api::news.news-populate-middleware"],
    },
    findOne: {
      middlewares: ["api::news.news-populate-middleware"],
    },
  },
});
