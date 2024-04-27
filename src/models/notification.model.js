const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  message: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  readAt: {
    type: Date,
  },
  metadata: {
    type: String,
  },
  priority: {
    type: String,
    required: true,
  },
  actions: {
    type: String,
  },
  deliveryMethod: {
    type: String,
    required: true,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
