import React, { useRef } from 'react';
import { TwitterLogin } from 'react-twitter-login';

interface TwitterLoginButtonProps {
    onSuccess: (response: any) => void;
    onFailure: (error: any) => void; // Added onFailure to the props interface
}

const TwitterLoginButton: React.FC<TwitterLoginButtonProps> = ({ onSuccess, onFailure }) => {
    const apiKey = process.env.NEXT_PUBLIC_TWITTER_API_KEY as string;
    const apiSecretKey = process.env.NEXT_PUBLIC_TWITTER_API_SECRET_KEY as string;

    const twitterLoginRef = useRef<any>(null); // Initialized with null

    const handleAuth = (error: any, data: any) => {
        if (error) {
            console.log('Login Failure:', error);
            onFailure(error);
        } else {
            console.log('Login Success:', data);
            onSuccess(data);
        }
    };

    return (
        <>
            <TwitterLogin
                ref={twitterLoginRef}
                authCallback={handleAuth}
                consumerKey={apiKey}
                consumerSecret={apiSecretKey}
                callbackUrl="YOUR_CALLBACK_URL"
                className="twitter-login-button"
            />
            <button className="twitter-login-button btn">
                <i className="bi bi-twitter" style={{ fontSize: '1.5rem' }}></i>
            </button>
        </>
    );
};

export default TwitterLoginButton;
