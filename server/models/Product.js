const mongoose = require("mongoose");

const schemaProduct = mongoose.Schema({
  name: String,
  image: String,
  description: String,
});
module.exports = mongoose.model("product", schemaProduct);
