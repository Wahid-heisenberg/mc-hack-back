const express = require("express");
const { date } = require("joi");
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  path: {
    type: String,
  },
  data : {
    type: Buffer,
  },

  type: {
    type: String,
  },
  size: {
    type: Number,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  category: {
    type: String,
    default: "workflow",
    enum: ["workflow", "factorization"],

  },
  uploadedAt: {
    type: Date,
    default: Date.now(), // Use default value of current date
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;

