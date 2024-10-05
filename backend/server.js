const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Imports Recipe model
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connects to MongoDB Database
mongoose.connect("mongodb+srv://Ibrahim:<db_password>@dishdash.9bm83.mongodb.net/?retryWrites=true&w=majority&appName=dishdash", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Route to get Recipes based on Ingredients
app.post('/recipes', async (req, res) => {
  const { ingredients } = req.body; // Extract ingredients from request

  try {
    //Finds recipes that match given ingredients (allows partial matches)
    const recipes = await Recipe.find({
      ingredients: { $in: ingredients }
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "An Error Occured! "})
  }
});

// Starts Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
