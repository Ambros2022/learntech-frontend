import { GoogleLogout } from 'react-google-login';


const clientId = "605863392131-ftqj61h4djtrt0d0aa0dtjuo5lcbt7km.apps.googleusercontent.com";

function GoogleLogoutButton() {

    const onSuccess=()=>{
        console.log('Logout Successfull!');
    }
    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
            />

        </div>
    )

}
export default GoogleLogoutButton;