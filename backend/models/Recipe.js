const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      ingredients: {
        type: [String], // Array of strings
        required: true,
      },
      directions: {
        type: [String], // Array of strings
        required: true,
      },
      link: {
        type: String,
      },
      source: {
        type: String,
      },
      NER: {
        type: [String], // Array of strings
        index: true,
      },
    }, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);