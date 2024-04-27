const mongoose = require("mongoose");
const Company = require("./company.model");
const User = require("./user.model");
const Employee = require("./employee.model");
const managerSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },

  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],

  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;
