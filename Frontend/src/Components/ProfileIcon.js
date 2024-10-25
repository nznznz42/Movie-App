import React, {useEffect, useState} from 'react';
import {Avatar, Menu, MenuItem, Tooltip} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {useAuth} from './AuthContext';

export default function ProfileIcon() {
    const [profileImage, setProfileImage] = useState(null);
    const {logout, profileImageUrl, currentUser} = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        navigate('/profile')
        handleClose();
    };

    const handleLogout = async () => {
        logout();
        navigate("/")
    };
    useEffect(() => {
        setProfileImage(profileImageUrl)
    }, [profileImageUrl])
    return (
        <div>
            <Tooltip title="Profile" arrow>
                <Avatar
                    sx={{bgcolor: 'gray', width: 36, height: 36, marginLeft: 2}}
                    onClick={handleClick}
                    src={profileImage}
                >
                    {!profileImageUrl ? currentUser.username.charAt(0).toUpperCase() : profileImageUrl}
                </Avatar>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    );
}
