"use strict";

/**
 * `page-populate-middleware` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query = {
      ...ctx.query,
      populate: ctx.query.populate,
      locale: ctx.query.locale,
    };

    console.log("service-populate-middleware.js: ctx.query = ", ctx.query);

    await next();
  };
};
