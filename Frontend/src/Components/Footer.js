import React from 'react';
import XIcon from '@mui/icons-material/X';
import { Facebook, Instagram, LinkedIn } from '@mui/icons-material';
import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box 
      sx={{ 
        backgroundColor: '#0d0d0d', 
        color: '#ccc', 
        padding: '20px 40px', 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: { xs: 'center', sm: 'space-between' }, 
        alignItems: 'center',
        fontSize: '14px'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px', 
          marginBottom: { xs: '20px', sm: '0' }, 
        }}
      >
        <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>
          <Instagram sx={{ color: '#ccc' }} />
        </Link>
        <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>
          <XIcon sx={{ color: '#ccc' }} />
        </Link>
        <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>
          <Facebook sx={{ color: '#ccc' }} />
        </Link>
        <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>
          <LinkedIn sx={{ color: '#ccc' }} />
        </Link>
      </Box>

      <Box sx={{ textAlign: { xs: 'center', sm: 'right' }, width: '100%' }}> 
        <Typography sx={{ color: '#ccc', marginBottom: '5px' }}>
          © 2024 Muzix.com, Inc. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '5px' }}>
          <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>Terms & Conditions</Link>
          <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>Policy</Link>
          <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>Copyright</Link>
          <Link href="#" sx={{ color: '#ccc', textDecoration: 'none' }}>Cookies</Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;