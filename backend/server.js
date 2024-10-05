require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Imports Recipe model
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes

/** 
 * Route: GET /api/recipes
 * Description: Retrieve all recipes (limited to 100 for performance)
 */
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find().limit(100);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/** 
 * Route: GET /api/recipes/:id
 * Description: Retrieve a single recipe by its ID
 */
app.get('/api/recipes/:id', getRecipe, (req, res) => {
  res.json(res.recipe);
});

/** 
 * Middleware Function: getRecipe
 * Description: Fetches a recipe by ID and attaches it to res.recipe
 */
async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: 'Cannot find recipe' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.recipe = recipe;
  next();
}

/** 
 * Route: GET /api/search
 * Description: Search recipes by query (title or ingredients)
 * Query Parameters:
 *   - query: The search term
 */
app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: 'Please provide a search query.' });
  }

  try {
    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { ingredients: { $regex: query, $options: 'i' } },
      ],
    }).limit(100);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/** 
 * Route: POST /api/recipes/searchByIngredients
 * Description: Search recipes by a list of ingredients
 * Request Body:
 *   - ingredients: An array of ingredient strings
 */
app.post('/api/recipes/searchByIngredients', async (req, res) => {
  const { ingredients } = req.body;

  // Validate input
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ message: 'Please provide an array of ingredients.' });
  }

  try {
    // Convert ingredients to lowercase for case-insensitive matching
    const lowerCaseIngredients = ingredients.map((ing) => ing.toLowerCase());

    // Find recipes where the NER field contains any of the input ingredients
    const recipes = await Recipe.find({
      NER: { $in: lowerCaseIngredients },
    }).limit(100);

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Starts Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
