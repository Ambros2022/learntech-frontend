import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = () => {
    const responseGoogle = (response) => {
        console.log(response);
        if (response.error) {
            // Handle error here
            console.error('Google login error:', response.error);
        } else {
            // Handle success here
            console.log('Google login success:', response);
            // Redirect or perform further actions
        }
    };

    return (
        <GoogleLogin
            clientId="1056225267439-6bhrvskavfkm6ce8en6ml4qs30038udi.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleLoginButton;
