const joi = require("joi");

const registrationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
    confirmpassword: joi.string().valid(joi.ref("password")).required(),
    userRole: joi.string().valid( "company", "manager", "employee"  ).default("employee"),
  });

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  });

const updateSchema = joi.object({
    user_id: joi.number().required(),
  });

module.exports = { registrationSchema , loginSchema };