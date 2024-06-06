// components/FacebookLoginButton.tsx

import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

interface FacebookLoginButtonProps {
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
}

const FacebookLoginButton: React.FC<FacebookLoginButtonProps> = ({ onSuccess, onFailure }) => {
  const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string;

  const handleResponse = (response: any) => {
    if (response.status !== 'unknown') {
      console.log('Login Success:', response);
      onSuccess(response);
    } else {
      console.error('Login Failure:', response);
      onFailure(response);
    }
  };

  return (
    <FacebookLogin
      appId={appId}
      autoLoad={false}
      callback={handleResponse}
      render={({ onClick }) => (
        <button onClick={onClick} className="facebook-login-button btn">
          <i className="bi bi-facebook" style={{ fontSize: '1.5rem' }}></i>
        </button>
      )}
    />
  );
};

export default FacebookLoginButton;
