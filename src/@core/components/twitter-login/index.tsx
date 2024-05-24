// components/TwitterLoginButton.tsx
import React from 'react';
import TwitterLogin from 'react-twitter-login';

const TwitterLoginButton: React.FC<{ handleTwitterLogin: (data: any) => void }> = ({ handleTwitterLogin }) => {
  const apiKey = 'YIDyEUMR9PDHbl9T7Fkiysaqv'; // Your Twitter API Key
  const apiSecretKey = 'jaFvIYvszIiSus9IU9yGY8DEYf6EesMCAgYtroRJDdWMiPGsM1'; // Your Twitter API Secret Key
  const authHandler = (error: any, data: any) => {
    if (error) {
      console.error('Twitter login error:', error);
    } else {
      console.log('Twitter login success:', data);
      handleTwitterLogin(data);
    }
  };

  return (
    <TwitterLogin
      authCallback={authHandler} // Make sure to specify the correct API route for Twitter login
      requestTokenUrl="/api/auth/twitter/request_token" // Optional, specify the request token URL
      consumerKey={apiKey}
      consumerSecret={apiSecretKey}
      className="twitter-login-button"
      buttonText="Login with Twitter"
      showIcon={false}
    />
  );
};

export default TwitterLoginButton;
