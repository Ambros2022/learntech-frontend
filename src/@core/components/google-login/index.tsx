import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string; // Ensure this matches your environment variable key

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
      className="google-login-button"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
      render={renderProps => (
        <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google-login-button btn">
          <i className="bi bi-google" style={{ fontSize: '1.5rem' }}></i>
        </button>
      )}
    />
  );
};

export default GoogleLoginButton;
