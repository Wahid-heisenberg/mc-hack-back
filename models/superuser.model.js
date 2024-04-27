const mongoose = require("mongoose");

const superuserSchema = new mongoose.Schema({
  companies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Superuser = mongoose.model("Superuser", superuserSchema);

module.exports = Superuser;
