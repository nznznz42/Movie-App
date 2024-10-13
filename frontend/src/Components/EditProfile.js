import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Typography, Avatar, TextField, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; 
import { useAuth } from "./AuthContext";

export default function EditProfile({account}) {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null); 
  const { currentUser } = useAuth();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: account?.username || '',
      email: account?.email || '',
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); 
      };
      reader.readAsDataURL(file);
      setProfileImage(file);
    }
  };

  const handleEditClick = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  const onSubmit = (data) => {
    console.log('Form data:', data);
    if (profileImage) {
      console.log('Image uploaded:', profileImage);
    }
    alert('Profile saved successfully!');
  };

  return (
    <div>
      {/* Profile Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          backgroundColor: '#151515',  // Changed to a black shade
          color: 'white'  // Set global text color to white
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: -15, marginBottom: '40px', color: '#fff' }}>
          CHANGE YOUR PROFILE
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '30px', position: 'relative' }}>
          {/* Clickable Profile Image */}
          <label htmlFor="profile-image-upload" style={{ cursor: 'pointer' }}>
            <Avatar alt="Profile Picture"
              src={preview || currentUser.profileImageUrl}  // Show preview if image is selected, otherwise show from context
              sx={{ width: 100, height: 100, marginBlock: '-4px' }}
              onClick={handleEditClick} // Trigger the file input when avatar is clicked
            />
          </label>
          <input accept="image/*" style={{ display: 'none' }} id="profile-image-upload" type="file"
            onChange={handleImageChange} ref={fileInputRef} // Reference to the input element 
          />
          {/* Edit Icon Positioned at Bottom Right of Avatar */}
          <IconButton
            sx={{ position: 'absolute', bottom: 0, right: '10px', backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', width: 30, height: 30 }}
            aria-label="edit picture" onClick={handleEditClick} // Trigger the file input when the edit icon is clicked
          >
            <EditIcon />
          </IconButton>
        </Box>

        {/* Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ width: '100%' }}>
            <Grid item xs={12}>
              <TextField fullWidth label="User Name" name="username" {...register('username')}
                InputLabelProps={{ style: { color: '#fff' } }} // Change label text to white
                InputProps={{
                  sx: {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)', // Light white border color
                    },
                    '& input': {
                      color: '#fff', // Change input text to white
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.8)', // Brighter white on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff', // Fully white border when focused
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="E-mail address" name="email" {...register('email')}
                InputLabelProps={{ style: { color: '#fff' } }} // Change label text to white
                InputProps={{
                  sx: {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)', // Light white border color
                    },
                    '& input': {
                      color: '#fff', // Change input text to white
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.8)', // Brighter white on hover
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#fff', // Fully white border when focused
                    }
                  }
                }}
              />
            </Grid>
          </Grid>

          {/* Save Button */}
          <Button type="submit" variant="contained"
            sx={{ marginTop: '30px', backgroundColor: '#2f2fd8', color: '#fff' }} >
            Save </Button>
        </form>
      </Box>
    </div>
  );
}