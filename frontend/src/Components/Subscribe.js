import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const Container = styled(Box)`
  display: flex;
  justify-content: space-around;
  padding: 15px 20px;
  background-color: #0b0f19; /* Dark background */
  min-height: 80vh;
  color: #fff; /* White text */

  @media (max-width: 700px) {
    flex-direction: column; /* Stack items vertically on small screens */
    align-items: center; /* Center the items */
  }
`;

const PlanCard = styled(Card)`
  background-color: #131828; /* Darker card background */
  border-radius: 12px;
  width: 320px;
  padding: 20px;
  margin: 20px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5); /* Stronger shadow */
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1); /* Soft border */
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px); /* Lift on hover */
    box-shadow: 0 15px 30px rgba(50, 50, 93, 0.5);
  }
`;

const PlanHeader = styled(Box)`
  background-color: #1d2d50; /* Dark blue header */
  color: white;
  padding: 15px;
  border-radius: 12px 12px 0 0;
`;

const PriceTag = styled(Typography)`
  font-size: 36px;
  color:white;
  // font-weight: bold;
  margin: 20px 0;
`;

const Features = styled(Typography)`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
`;

const PlanButton = styled(Button)`
  background-color: #e50914;
  color: white;
  margin-top: 20px;
  padding: 10px 30px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0px 0px 15px rgba(229, 9, 20, 0.7); /* Neon glow effect */
  &:hover {
    background-color: #b20710;
    box-shadow: 0px 0px 20px rgba(229, 9, 20, 0.9);
  }
`;

const PlanTag = styled(Box)`
  background-color: #635fc7; /* Purple for the 'Most Popular' tag */
  color: white;
  padding: 8px 20px; /* Increased padding */
  border-radius: 20px;
  position: absolute;
  top: -25px; /* Increased space from the top */
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px; /* Increased font size */
  font-weight: bold;
  z-index: 1; /* Ensure it's always above the card */
`;

const Subscribe = () => {
  return (
    <Container>
      {/* Basic Plan */}
      <PlanCard>
        <PlanHeader>
          <Typography variant="h6">Basic</Typography>
        </PlanHeader>
        <CardContent>
          <PriceTag>Free</PriceTag>
          <Features>Video Quality: Best</Features>
          <Features>Resolution: 1080p</Features>
          <Features>Devices: Mobile, Tablet</Features>
          <Features>Features: Limited Number of Movie</Features>
          <PlanButton variant="contained">Current Plan</PlanButton>
        </CardContent>
      </PlanCard>

      {/* Premium Plan */}
      <PlanCard>        
        <PlanHeader>
          <Typography variant="h6">Premium</Typography>
        </PlanHeader>
        <CardContent>
          <PriceTag>₹399/month</PriceTag>
          <Features>Video Quality: Best</Features>
          <Features>Resolution: 1080p</Features>
          <Features>Devices: TV, Mobile, Tablet</Features>
          <Features>Features: Available Most Popular Movies</Features>
          <PlanButton variant="contained">Subscribe Now</PlanButton>
        </CardContent>
      </PlanCard>
    </Container>
  );
};

export default Subscribe;