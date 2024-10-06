// frontend/src/components/RecipeList.jsx

import React from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import { useRecipeContext } from '../context/RecipeContext';
import RecipeCard from './RecipeCard';
import { motion } from 'framer-motion';

function RecipeList() {
  const { recipes, loading, error } = useRecipeContext();

  if (loading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  if (recipes.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ mt: 4 }}>
        No recipes found. Please add ingredients and search.
      </Typography>
    );
  }

  return (
    <Grid container spacing={4}>
      {recipes.map((recipe, index) => (
        <Grid item xs={12} sm={6} md={4} key={recipe._id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <RecipeCard recipe={recipe} />
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}

export default RecipeList;
