// GoogleLoginButton.js

import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const clientId = '521683962051-sfilc9av11sf7j4pknhprcmf6ioibar6.apps.googleusercontent.com'; // Replace with your Google OAuth2 client ID

  const handleSuccess = (response) => {
    console.log('Login Success:', response);
    onSuccess(response);
  };

  const handleFailure = (error) => {
    console.error('Login Failure:', error);
    onFailure(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText=""
      className={"google-login-button"}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
