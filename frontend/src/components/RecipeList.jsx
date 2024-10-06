import React from 'react';
import { Grid } from '@mui/material';
import { useRecipeContext } from '../context/RecipeContext';
import RecipeCard from './RecipeCard';

function RecipeList() {
  const { recipes } = useRecipeContext();

  return (
    <Grid container spacing={4}>
      {recipes.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} key={recipe._id}>
          <RecipeCard recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
}

export default RecipeList;
