import React, { useState } from 'react';
import { TextField, Button, Box} from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

export default function OTP({ userData, profileImageFile}) {
  const { register, handleSubmit, formState: { errors }, trigger, reset } = useForm();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const checkOTP = async (email, otp) => {
    const url = "http://localhost:8080/auth/signup/check-otp";
    try {
      console.log("Sending OTP verification request:", { email, otp });
      const response = await axios.post(url, {
        email: email,
        otp: otp,
      });
      console.log("OTP Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data || error);
      throw error;
    }
  };
  
  
  const handleSignup = async (userData, profileImageFile) => {
    const url = 'http://localhost:8080/auth/signup';
    const formData = new FormData();
    
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    
    if (profileImageFile) {
      formData.append('profileImage', profileImageFile, profileImageFile.name);
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("User created successfully");
      navigate("/")
      reset();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Username/Email already taken");
      } else if (error.response && error.response.status === 406) {
        alert("Email already exists");
      } else {
        console.error('Error during signup', error);
        alert("Signup failed");
      }
    }
  };

const verifyOtpAndSignup = async (userData, otp, profileImageFile) => {
    try {
        const otpResponse = await checkOTP(userData.email, otp);
        
        if (otpResponse.success) {
          await handleSignup(userData, profileImageFile);
        } else {
          alert("OTP verification failed");
        }
      } catch (error) {
        console.error("Error in OTP verification or signup:", error);
        alert("Something went wrong. Please try again.");
      }
    };

    
    const onSubmit = (data) => {
        const otp = data.otp;
        verifyOtpAndSignup(userData, otp, profileImageFile);
      };


  
  return (
    <div style={{ width: "85%", height: "80%", justifyContent: "center", margin: "20px" }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit(onSubmit)} 
        sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }} 
        noValidate
      >
        <TextField
          label="OTP"
          variant="filled"
          {...register("otp", { required: "OTP is required" })}
          error={!!errors.otp}
          helperText={errors.otp ? errors.otp.message : ""}
          onBlur={() => trigger('otp')}
        />

        <Button 
          type="submit"
          variant="contained" 
          color="error" 
          sx={{ mt: 2, width: '200px', display: 'block', margin: '15px auto', color: "black" }}
        >
          Submit
        </Button>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
