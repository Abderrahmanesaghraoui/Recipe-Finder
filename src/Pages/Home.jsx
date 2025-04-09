import { useState, useEffect } from 'react';
import { Container, Grid, CircularProgress, Typography, Alert } from '@mui/material';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('favoriteRecipes', []);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const APP_ID = import.meta.env.VITE_APP_ID || 'YOUR_APP_ID';
  const APP_KEY = import.meta.env.VITE_APP_KEY || 'YOUR_APP_KEY';

  const searchRecipes = async (query) => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=12`
      );
      setRecipes(response.data.hits.map(hit => hit.recipe));
      setSearchPerformed(true);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.some(fav => fav.uri === recipe.uri);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.uri !== recipe.uri));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SearchBar onSearch={searchRecipes} />
      
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
          <CircularProgress />
        </div>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && searchPerformed && recipes.length === 0 && (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No recipes found. Try a different search term.
        </Typography>
      )}

      <Grid container spacing={4} sx={{ flexGrow: 1 }}>
        {recipes.map((recipe) => (
          <Grid item key={recipe.uri} xs={12} sm={6} md={4}>
            <RecipeCard
              recipe={recipe}
              isFavorite={favorites.some(fav => fav.uri === recipe.uri)}
              onToggleFavorite={toggleFavorite}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
