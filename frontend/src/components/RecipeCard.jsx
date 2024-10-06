import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { motion } from 'framer-motion';

function RecipeCard({ recipe }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {recipe.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ingredients: {recipe.ingredients.join(', ')}
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: 'auto' }}>
          <Button size="small" href={recipe.link} target="_blank">
            View Recipe
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}

export default RecipeCard;