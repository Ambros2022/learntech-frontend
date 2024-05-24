// components/LinkedInAuthComponent.tsx
import React from 'react';
import LinkedInLogin from 'react-linkedin-login-oauth2';

const LinkedInAuthComponent: React.FC = () => {
  const handleSuccess = (data: any) => {
    // Data will contain the user's LinkedIn profile information
    console.log(data);
  };

  const handleFailure = (error: any) => {
    // Handle authentication failure
    console.error(error);
  };

  return (
    <LinkedInLogin
      clientId="YOUR_LINKEDIN_CLIENT_ID"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      redirectUri="http://localhost:3000/auth/linkedin" // Specify your redirect URI here
    />
  );
};

export default LinkedInAuthComponent;
