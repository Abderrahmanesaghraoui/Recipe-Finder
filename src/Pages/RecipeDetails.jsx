import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Grid, List, ListItem, ListItemText, Chip, Divider, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('favoriteRecipes', []);

  const APP_ID = import.meta.env.VITE_APP_ID || 'YOUR_APP_ID';
  const APP_KEY = import.meta.env.VITE_APP_KEY || 'YOUR_APP_KEY';

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        setRecipe(response.data.recipe);
      } catch (err) {
        setError('Failed to fetch recipe details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const toggleFavorite = () => {
    if (!recipe) return;
    
    const isFavorite = favorites.some(fav => fav.uri === recipe.uri);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.uri !== recipe.uri));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!recipe) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6">Recipe not found</Typography>
      </Container>
    );
  }

  const isFavorite = favorites.some(fav => fav.uri === recipe.uri);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" gutterBottom>
              {recipe.label}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Source: {recipe.source}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={`${Math.round(recipe.calories)} calories`} />
              <Chip label={`${recipe.yield} servings`} />
              <Chip
                label={isFavorite ? 'Saved' : 'Save'}
                onClick={toggleFavorite}
                color={isFavorite ? 'primary' : 'default'}
                icon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              />
            </Box>
            <img
              src={recipe.image}
              alt={recipe.label}
              style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Ingredients
            </Typography>
            <List dense>
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={ingredient.text}
                    secondary={ingredient.food}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Nutrition
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(recipe.totalNutrients).map(([key, nutrient]) => (
                <Grid item xs={6} sm={4} key={key}>
                  <Chip
                    label={`${nutrient.label}: ${Math.round(nutrient.quantity)} ${nutrient.unit}`}
                    variant="outlined"
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {recipe.healthLabels.map((label) => (
              <Chip key={label} label={label} color="secondary" size="small" />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipeDetails;
