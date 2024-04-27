const fs = require("fs");
const path = require("path");

const get_image = (name) => {
  return fs
    .readFileSync(path.join(__dirname , `/uploads/${name}`))
    .toString("base64");
};

module.exports = { get_image };