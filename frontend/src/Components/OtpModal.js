import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close'; 
import OTP from './OTP';

const modalStyle = {
  position: 'fixed', 
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  bgcolor: 'rgba(0, 0, 0, 0.7)', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999, 
};

const boxStyle = {
  bgcolor: '#adadac;', 
  boxShadow: 24,
  p: 4,
  borderRadius: 2, 
  position: 'relative', 
  width: '400px', 
  maxHeight: '90%', 
  overflow: 'auto', 
};

export default function OtpFormModal({userData, profileImageFile}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Function to send the OTP request
    const sendOtp = async () => {
      try {
        const response = await axios.post('/signup/send-otp', null, {
          params: {
            email: userData.email,
          },
        });
        if (response.status === 200) {
          console.log('OTP sent successfully');
        }
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
    };

    if (userData.email) {
      sendOtp();
    }
  }, [userData.email]); 


  return (
    <div>
      <Button onClick={handleOpen} style={{ background: "red", color: "black", width: "100px" }}>Sign In</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={false}
      >
        <Box sx={modalStyle}>
          <Box sx={boxStyle}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', flexGrow: 1 }}>
                {isLoginForm ? 'Sign In' : 'Sign Up'}
              </Typography>
              <Button 
                onClick={handleClose} 
                sx={{ 
                  minWidth: 0,
                  padding: 1, 
                  
                  color: 'black', 
                }}
              >
                <CloseIcon /> 
              </Button>
            </Box>
            <OTP userData={userData} profileImageFile={profileImageFile} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}