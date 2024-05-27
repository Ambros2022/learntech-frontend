// FacebookLoginButton.js

import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ onSuccess, onFailure }) => {
  const appId = '964498108717066'; // Replace with your Facebook App ID

  const handleSuccess = (response) => {
    console.log('Login Success:', response);
    onSuccess(response);
  };

  const handleFailure = (error) => {
    console.error('Login Failure:', error);
    onFailure(error);
  };

  return (
    <FacebookLogin
      appId={appId}
      autoLoad={false}
      fields="name,email,picture"
      callback={handleSuccess}
      onFailure={handleFailure}
      cssClass="facebook-login-button"
      icon="fa-facebook"
    />
  );
};

export default FacebookLoginButton;
