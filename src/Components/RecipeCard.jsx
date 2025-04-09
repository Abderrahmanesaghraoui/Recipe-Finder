import { Card, CardMedia, CardContent, Typography, Button, CardActions, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite }) => {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={recipe.image}
        alt={recipe.label}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {recipe.label}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Calories: {Math.round(recipe.calories)} | Servings: {recipe.yield}
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {recipe.healthLabels.slice(0, 3).map((label) => (
            <Chip key={label} label={label} size="small" />
          ))}
        </div>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => onToggleFavorite(recipe)}
          startIcon={isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        >
          {isFavorite ? 'Saved' : 'Save'}
        </Button>
        <Button size="small" component={Link} to={`/recipe/${recipe.uri.split('#')[1]}`}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
