// models/Recipe.js
const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],  // Array of ingredients
    instructions: String,
});

module.exports = mongoose.model('Recipe', RecipeSchema);
