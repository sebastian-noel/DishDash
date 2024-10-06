import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const RecipeContext = createContext();

export function useRecipeContext() {
  return useContext(RecipeContext);
}

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async (ingredients) => {
    try {
      const response = await axios.post('http://localhost:5000/api/recipes/searchByIngredients', {
        ingredients,
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <RecipeContext.Provider value={{ recipes, fetchRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
}
