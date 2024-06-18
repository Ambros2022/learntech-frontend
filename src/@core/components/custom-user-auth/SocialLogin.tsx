import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

export default function Home() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string; // Ensure this matches your environment variable key

    const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        alert("Login successful");
        console.log('Login Success:', response);
    };

    const handleFailure = (error: any) => {
        if (error.error === "popup_closed_by_user") {
            console.error('User closed the Google Sign-In popup.');
            alert('Popup window was closed by the user.');
        } else {
            console.error('Login Failure:', error);
        }
    };

    return (
        <>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                className="google-login-button"
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                    <button onClick={renderProps.onClick} className="google-login-button btn">
                        <i className="bi bi-google" style={{ fontSize: '1.5rem' }}></i>
                    </button>
                )}
            />
        </>
    );
}
