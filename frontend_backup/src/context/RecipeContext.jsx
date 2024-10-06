// frontend/src/context/RecipeContext.jsx

// ... existing imports
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const RecipeContext = createContext();

export function useRecipeContext() {
  return useContext(RecipeContext);
}

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false); // Ensure loading state is initialized
  const [error, setError] = useState(null);

  const fetchRecipes = async (ingredients) => {
    setLoading(true); // Set loading to true when fetching starts
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/api/recipes/searchByIngredients', {
        ingredients,
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false when fetching ends
    }
  };

  return (
    <RecipeContext.Provider value={{ recipes, fetchRecipes, loading, error }}>
      {children}
    </RecipeContext.Provider>
  );
}
