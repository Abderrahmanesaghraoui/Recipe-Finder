import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', mb: 4, width: '100%' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for recipes (e.g., chicken, pasta, vegetarian)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" size="large">
        <SearchIcon sx={{ mr: 1 }} />
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
