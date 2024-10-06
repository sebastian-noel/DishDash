import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import { Container, Typography } from '@mui/material';
import IngredientForm from './components/ingredientForm';
import RecipeList from './components/RecipeList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h3" align="center" gutterBottom>
          DishDash
        </Typography>
        <IngredientForm />
        <RecipeList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
