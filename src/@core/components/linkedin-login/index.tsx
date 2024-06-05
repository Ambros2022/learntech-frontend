// components/LinkedInLoginButton.tsx

import React from 'react';
import { LinkedIn } from 'react-linkedin-login-oauth2';

interface LinkedInLoginButtonProps {
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
}

const LinkedInLoginButton: React.FC<LinkedInLoginButtonProps> = ({ onSuccess, onFailure }) => {
  const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID as string;

  const handleSuccess = (response: any) => {
    console.log('Login Success:', response);
    onSuccess(response);
  };

  const handleFailure = (error: any) => {
    console.error('Login Failure:', error);
    onFailure(error);
  };

  // Check if window is defined (i.e., we're in the browser)
  const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/linkedin` : '';

  return (
    <LinkedIn
      clientId={clientId}
      redirectUri={redirectUri}
      onSuccess={handleSuccess}
      onError={handleFailure}
      scope="r_liteprofile r_emailaddress"
      state="123456" // example state parameter
    >
      {({ linkedInLogin }: { linkedInLogin: any }) => (
        <button onClick={linkedInLogin} className="linkedin-login-button btn">
          Login with LinkedIn
        </button>
      )}
    </LinkedIn>
  );
};

export default LinkedInLoginButton;
