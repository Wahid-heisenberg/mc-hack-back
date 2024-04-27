const joi = require('joi');

// joi schema for create project request validation
const createProjectSchema = joi.object({
  name: joi.string().min(2).max(50).required(),
  company: joi.string().required(), // Assuming company ID is a string
  manager: joi.string().required(), // Assuming manager ID is a string
  groups: joi.array().items(joi.string()), // Assuming group IDs are strings
  employees: joi.array().items(joi.string()), // Assuming employee IDs are strings
  progress: joi.number().min(0).max(100),
  startDate: joi.date().required(),
  endDate: joi.date().required(),
});

// joi schema for update project info request validation
const updateProjectInfoSchema = joi.object({
  name: joi.string().min(2).max(50),
  company: joi.string(), // Assuming company ID is a string
  manager: joi.string(), // Assuming manager ID is a string
  groups: joi.array().items(joi.string()), // Assuming group IDs are strings
  employees: joi.array().items(joi.string()), // Assuming employee IDs are strings
  progress: joi.number().min(0).max(100),
  startDate: joi.date(),
  endDate: joi.date(),
});

// joi schema for update project progress request validation
const updateProjectProgressSchema = joi.object({
  progress: joi.number().min(0).max(100).required(),
});

module.exports = {
  createProjectSchema,
  updateProjectInfoSchema,
  updateProjectProgressSchema,
};
