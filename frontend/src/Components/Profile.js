import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import EditProfile from './EditProfile';
import UserWatchList from './UserWatchlist';
import Subscribe from './Subscribe'; 
import { useAuth } from './AuthContext';
import axios from 'axios';

export default function Profile() {
  const [activeSection, setActiveSection] = useState('profile');
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  const fetchAccountDetails = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8081/account`, {
        params: { username }
      });
      setAccount(response.data);
      setError(null); 
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Account not found');
      } else {
        setError('An error occurred while fetching account details');
      }
      setAccount(null);
    }
  };

  useEffect(() => {
    if (account) {
      console.log(account);
    }
  }, [account]);
  

  useEffect(() => {
    fetchAccountDetails(currentUser.username)
  }, [currentUser.username])

  // Function to handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#fff',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '16%', md: '15%' }, // Full width on small screens, 16% on small, 15% on medium+
          backgroundColor: '#0e0e0e',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '20px',
          alignItems: { xs: 'center', sm: 'flex-start' }, // Center items on small screens
          position: { sm: 'sticky' }, // Sidebar becomes sticky for larger screens
          top: 0, // Stick to the top of the viewport
          height: '100vh', // Full viewport height
          overflow: 'hidden', // No scrolling in the sidebar
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            marginBottom: '40px',
            textAlign: { xs: 'center', sm: 'left' }, // Center on small screens
            width: '100%',
          }}
        >
          PROFILE
        </Typography>

        {/* Sidebar Buttons */}
        <Button
          variant="text"
          sx={{
            marginBottom: '20px',
            justifyContent: { xs: 'center', sm: 'flex-start' }, // Center on small screens
            textTransform: 'none',
            color: 'white',
            textAlign: 'left',
            width: '100%',
          }}
          onClick={() => handleSectionChange('profile')}
        >
          Profile
        </Button>
        <Button
          variant="text"
          sx={{
            marginBottom: '20px',
            justifyContent: { xs: 'center', sm: 'flex-start' }, // Center on small screens
            textTransform: 'none',
            color: 'white',
            textAlign: 'left',
            width: '100%',
          }}
          onClick={() => handleSectionChange('watchlist')}
        >
          WatchList
        </Button>
        <Button
          variant="text"
          sx={{
            marginBottom: '20px',
            justifyContent: { xs: 'center', sm: 'flex-start' }, // Center on small screens
            textTransform: 'none',
            color: 'white',
            textAlign: 'left',
            width: '100%',
          }}
          onClick={() => handleSectionChange('subscription')} // New button for Subscription
        >
          Subscription
        </Button>
      </Box>

      {/* Content Area (scrollable) */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: { xs: '5px', sm: '5px' }, // Padding adjusts based on screen size
          backgroundColor: '#151515',
        }}
      >
        {/* Conditionally render EditProfile when "Profile" is clicked or initially */}
        {activeSection === 'profile' && (
          <Box
            sx={{
              width: '100%',
              maxWidth: '750px',
              backgroundColor: 'white',
              borderRadius: '10px',
            }}
          >
            <EditProfile account={account}/>
          </Box>
        )}

        {activeSection === 'watchlist' && (
          <Box
            sx={{
              width: '100%',
              maxWidth: '750px',
              padding: { xs: '5px', sm: '10px' }, 
              backgroundColor: '#151515',
              borderRadius: '10px',
            }}
          >
            <UserWatchList account={account}/>
          </Box>
        )}

        {activeSection === 'subscription' && (
          <Box
            sx={{
              minWidth:'99%',
              minHeight:'100%',
              padding: { xs: '5px', sm: '5px' }, 
              backgroundColor: '#0b0f19',
              borderRadius: '10px',
            }}
          >
            <Subscribe />
          </Box>
        )}
      </Box>
    </Box>
  );
}