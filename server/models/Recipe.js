const { Schema, model } = require('mongoose');

const recipeSchema = new Schema({
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
const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
