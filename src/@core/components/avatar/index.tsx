import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const AvatarContainer = styled('div')({
  position: 'relative',
  display: 'inline-block',
});

interface DropdownProps {
  isHovered: boolean;
}

const Dropdown = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isHovered',
})<DropdownProps>(({ theme, isHovered }) => ({
  display: isHovered ? 'block' : 'none',
  position: 'absolute',
  top: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  zIndex: 1,
}));

const AvatarDropdown = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('UserData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('UserData');
    setUserData(null);
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <AvatarContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar alt={userData ? userData.name : 'User'} className="mx-2">
        {userData ? userData.name.charAt(0) : 'U'}
      </Avatar>
      <Dropdown isHovered={isHovered}>
        <Typography variant="h4" className="mb-2 p-2 text-blue">
          Welcome, {userData ? userData.name : 'Guest'}!
        </Typography>
        {userData && (
          <Button variant="outlined" className="mb-2 p-2 viewMoreCollegeBtn" color="secondary" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Dropdown>
    </AvatarContainer>
  );
};

export default AvatarDropdown;
