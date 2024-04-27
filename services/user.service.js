const User = require("../models/user.model");

exports.get_by_id = async (id, squery = "-__v -createdAt -updatedAt") => {
    try {
      const user = await User.findById(id).select(squery);
  
      if (!user) {
        l
        return null;
      } else {
        return user;
      }
    } catch (err) {
      logger.error(err.message);
      return null;
    }
  };