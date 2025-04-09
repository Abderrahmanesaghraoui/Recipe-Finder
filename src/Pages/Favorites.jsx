import { Container, Grid, Typography } from '@mui/material';
import RecipeCard from '../components/RecipeCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Favorites = () => {
  const [favorites, setFavorites] = useLocalStorage('favoriteRecipes', []);

  const toggleFavorite = (recipe) => {
    setFavorites(favorites.filter(fav => fav.uri !== recipe.uri));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>
        Your Saved Recipes
      </Typography>

      {favorites.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 4 }}>
          You haven't saved any recipes yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {favorites.map((recipe) => (
            <Grid item key={recipe.uri} xs={12} sm={6} md={4}>
              <RecipeCard
                recipe={recipe}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
