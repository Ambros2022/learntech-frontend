import { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import {gapi} from 'gapi-script'


const clientId = "1056225267439-6bhrvskavfkm6ce8en6ml4qs30038udi.apps.googleusercontent.com";

function GoogleLoginButton() {

    // useEffect(()=>{
    //     function start(){
    //       gapi.client.init({
    //         clientId: clientId,
    //         scope:''
    //       })
    //     };
    //     gapi.load('client:auth2', start)
    //   },[]);

    const onSuccess = (res)=>{
        console.log('Login Success! Current User:', res.profileObj);
    }

    const onFailure = (res) => {
        if (res.error === 'popup_closed_by_user') {
          console.log('User closed the Google login popup');
          // You can show a message or handle this scenario as needed
        } else {
          console.log('Login Failed! res', res);
        }
      }
      
    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />

        </div>
    )

}
export default GoogleLoginButton;