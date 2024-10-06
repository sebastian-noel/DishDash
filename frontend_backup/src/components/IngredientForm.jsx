// src/components/IngredientForm.jsx

import React, { useState } from 'react';
import { TextField, Button, Chip, Box } from '@mui/material';
import { useRecipeContext } from '../context/RecipeContext';

function IngredientForm() {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const { fetchRecipes } = useRecipeContext();

  const handleAddIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDeleteIngredient = (ingredientToDelete) => {
    setIngredients(ingredients.filter((ing) => ing !== ingredientToDelete));
  };

  const handleSearch = () => {
    fetchRecipes(ingredients);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Add Ingredient"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddIngredient();
          }
        }}
        sx={{ mr: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddIngredient}>
        Add
      </Button>
      <Box sx={{ mt: 2 }}>
        {ingredients.map((ingredient) => (
          <Chip
            key={ingredient}
            label={ingredient}
            onDelete={() => handleDeleteIngredient(ingredient)}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSearch}
        sx={{ mt: 2 }}
      >
        Search Recipes
      </Button>
    </Box>
  );
}

export default IngredientForm;
