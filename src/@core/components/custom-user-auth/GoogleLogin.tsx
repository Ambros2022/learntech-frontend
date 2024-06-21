import React, { FC } from 'react';
import GoogleLogin from 'react-google-login';
import { useSnackbar } from 'notistack';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
interface Props {
    className?: any;
    title?: any;
}


const SocialGoogle: FC<Props> = ({ className, title, ...rest }) => {

    const { enqueueSnackbar } = useSnackbar();
    const isMountedRef = useIsMountedRef();
    const GclientID = "1056225267439-6bhrvskavfkm6ce8en6ml4qs30038udi.apps.googleusercontent.com";
    const responseGoogle = async (response) => {


        console.log(response);


        if (response.profileObj) {
            let email = response.profileObj.email ? response.profileObj.email : null;
            let userId = response.profileObj.googleId ? response.profileObj.googleId : null;
            let providername = 'google';
            let name = response.profileObj.name ? response.profileObj.name : '';
            let accessTokens = response.accessToken ? response.accessToken : '';
            try {
                // await sociallogin(userId, providername, email, name, accessTokens);
                // if (isMountedRef.current) {
                //     //  setStatus({ success: true });
                //     // setSubmitting(false);
                //     enqueueSnackbar('Successfully Loggedin', {
                //         variant: 'success',
                //     });
                // }
            } catch (err) {
                console.error(err);
                if (isMountedRef.current) {
                    //  setStatus({ success: false });
                    // if(err.success == false)
                    // {
                    //   setErrors({ submit: err.message });
                    // }
                    // setErrors({ submit: err.message });
                    //setErrors({ submit: err.message });
                    //  setSubmitting(false);

                    // enqueueSnackbar(err.message, {
                    //     variant: 'error',
                    // });
                }
            }




        }




    }


    return (
        <>

            <GoogleLogin

                clientId={GclientID}
                render={renderProps => (
                    <a onClick={renderProps.onClick} className="google" href=""><i className="bi bi-google"></i></a>

                )}
                className="google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}

            >

            </GoogleLogin>

        </>
    );
};

export default SocialGoogle;