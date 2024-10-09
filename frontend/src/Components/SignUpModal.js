import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import SignUp from './SignUp';

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 1,
  width: '100%',
  height: '100%',
  bgcolor: 'rgba(0, 0, 0, 0.5)', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999, 
};

const boxStyle = {
  bgcolor: '#9c9c9d;', 
  boxShadow: 24,
  p: 5,
  borderRadius: 2, 
  position: 'absolute',
  width: '400px', 
  maxHeight: '80%',
  minHeight:'70%',
  maxHeight: '70%', 
  overflow: 'hidden', 
};

export default function SignUpModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} style={{background:"red",color:"black",width:"100px"}}>JOIN NOW !</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true} 
      >
        <Box sx={modalStyle}>
          <Box sx={boxStyle}>
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                overflow:'hidden',
                alignItems: 'center', 
                mb: 0, 
                mt: -4, 
              }}
            >
              <Typography 
                id="modal-modal-title" 
                variant="h6" 
                component="h2" 
                sx={{ 
                  textAlign: 'center', 
                  flexGrow: 1,
                }}
              >
                <h4>Getting Started</h4>
              </Typography>

              <Button 
                onClick={handleClose} 
                sx={{ 
                  minWidth: 0, 
                  padding: 0, 
                  color: 'black',
                }}
              >
                <CloseIcon /> 
              </Button>
            </Box>
            <SignUp sx={{ maxHeight: '70%', overflowY: 'auto', padding: '10px' }} className="scrollable" />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
