"use strict";
const { validate } = require("jsonschema");
function generateValidationSchema(validationSchema) {
  return async (req, res, next) => {
    try {
      validate(req.body, validationSchema, { throwAll: true });
      next();
    } catch (error) {
      return res.status(400).send(error.errors);
    }
  };
}

module.exports = generateValidationSchema;
