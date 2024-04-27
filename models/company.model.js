const mongoose = require("mongoose");
const Project = require("./project.model");
const Bill = require("./bill.model");
const File = require("./file.model");
const User = require("./user.model");
const Employee = require("./employee.model");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  address: {
    type: String,
  },
  industry: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    enum: [
      "agriculture",
      "automotive",
      "construction",
      "education",
      "finance",
      "healthcare",
      "hospitality",
      "manufacturing",
      "media",
      "retail",
      "technology",
      "telecommunications",
      "transportation",
      "utilities",
    ],
  },
  managers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  bills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bill",
    },
  ],
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
