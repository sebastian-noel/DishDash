// frontend/src/components/RecipeCard.jsx

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardActionArea,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
          textDecoration: 'none',
        }}
      >
        {/* Make the entire Card clickable */}
        <CardActionArea
          component={Link}
          to={`/recipe/${recipe._id}`}
          sx={{ flexGrow: 1 }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom color="primary">
              {recipe.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            component={Link}
            to={`/recipe/${recipe._id}`}
            variant="contained"
            color="secondary"
          >
            View Recipe
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}

export default RecipeCard;
