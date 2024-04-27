const mongoose = require("mongoose");
const Group = require("./group.model");
const employeeSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },

  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manager",
  },
//   tasks: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Task",
//     },
//   ],
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
