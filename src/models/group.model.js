const mongoose = require("mongoose");
const Manager = require("./manager.model");
const Company = require("./company.model");
const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },

  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  color : {
    type: String,
    unique : true ,
    validate : {
      validator : function(v){
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
      },
      message : props => `${props.value} is not a valid color code`
    }
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Manager",
  },
  // employees: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Employee",
  //   },
  // ],
});

const group = mongoose.model("group", groupSchema);

module.exports = group;
