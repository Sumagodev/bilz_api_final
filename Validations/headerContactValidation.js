const { body, param } = require("express-validator");

const validateHeaderContact = [
  body("title").optional().isString().withMessage("title must be a string"),
  body("description").optional().isString().withMessage("description must be a string"),
];

const validateHeaderContactId = [
  param("id").isInt().withMessage("ID must be an integer"),
];

module.exports = { validateHeaderContact, validateHeaderContactId };
