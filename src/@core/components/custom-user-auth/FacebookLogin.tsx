// src/components/FacebookLoginButton.js

import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ onLogin }) => {
  const responseFacebook = (response) => {
    if (response.accessToken) {
      onLogin(response);
    } else {
      console.error('User cancelled login or did not fully authorize.');
    }
  };

  return (
    <FacebookLogin
      appId="490376203663873" // Replace with your Facebook App ID
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      icon="fa-facebook"
    />
  );
};

export default FacebookLoginButton;
