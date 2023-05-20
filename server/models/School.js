const { Schema, model } = require('mongoose');

const SchoolSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    ingredients: [
      {
        type: String,
        trim: true,
      },
    ],
  });
const School = model('School', SchoolSchema);

module.exports = School;
