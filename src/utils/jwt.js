const jwt = require("jsonwebtoken");

const generate_token = (id , role) => {
  return jwt.sign({ id , role }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

module.exports = generate_token;