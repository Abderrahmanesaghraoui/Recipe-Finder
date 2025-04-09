import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 3, mt: 'auto' }}>
      <Typography variant="body1" align="center">
        © {new Date().getFullYear()} Recipe Finder - Powered by Edamam API
      </Typography>
    </Box>
  );
};

export default Footer;
