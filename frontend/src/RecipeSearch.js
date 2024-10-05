import React, { useState } from 'react';
import axios from 'axios';

const RecipeSearch = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/recipes/searchByIngredients', {
        ingredients: ingredients.split(',').map(item => item.trim())
      });
      setRecipes(response.data);
    } catch (err) {
      setError('An error occurred while fetching recipes. Please try again.');
      console.error('Error fetching recipes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recipe Finder</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (comma-separated)"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
          Search Recipes
        </button>
      </form>
      
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {recipes.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Recommended Recipes:</h2>
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index} className="mb-2">
                <h3 className="font-medium">{recipe.title}</h3>
                <p>Ingredients: {recipe.ingredients.join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;