// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import Recipe model
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connects to MongoDB Database
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected');

    // Test query
    const count = await Recipe.countDocuments();
    console.log(`Total recipes in database: ${count}`);
  })
  .catch(err => console.log('MongoDB connection error:', err));


// Route to get Recipes based on Ingredients
app.post('/api/recipes/searchByIngredients', async (req, res) => {
    // Extract 'ingredients' from the request body
    const { ingredients } = req.body;
  
    // Validate input
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of ingredients.' });
    }
  
    // Debugging statements
    console.log('Received ingredients:', ingredients);
  
    try {
      // Convert ingredients to lowercase
      const lowerCaseIngredients = ingredients.map((ing) => ing.toLowerCase());
      console.log('Lowercase ingredients:', lowerCaseIngredients);
  
      // Find recipes where the NER field contains any of the input ingredients
      const recipes = await Recipe.find({
        NER: { $in: lowerCaseIngredients },
      }).limit(100);
  
      console.log('Number of recipes found:', recipes.length);
  
      res.json(recipes);
    } catch (error) {
      console.error('Error during recipe search:', error);
      res.status(500).json({ error: 'An error occurred!' });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});