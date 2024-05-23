// SignInWithFirebase.tsx

import React from 'react';
import firebase from '@firebase/app';
import { Auth } from 'firebase/auth';

const SignInWithFirebase: React.FC = () => {
  // const handleGoogleSignIn = async () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   try {
  //     await firebase.auth().signInWithPopup(provider);

  //     // Signed in successfully with Google
  //   } catch (error) {
  //     console.error('Google sign-in error:', error.message);

  //     // Handle error
  //   }
  // };

  const handleFacebookSignIn = async () => {
    // Implement Facebook sign-in logic
  };

  const handleTwitterSignIn = async () => {
    // Implement Twitter sign-in logic
  };

  const handleLinkedInSignIn = async () => {
    // Implement LinkedIn sign-in logic
  };

  return (
    <div>
      {/* <button onClick={handleGoogleSignIn}>Sign in with Google</button> */}
      <button onClick={handleFacebookSignIn}>Sign in with Facebook</button>
      <button onClick={handleTwitterSignIn}>Sign in with Twitter</button>
      <button onClick={handleLinkedInSignIn}>Sign in with LinkedIn</button>
    </div>
  );
};

export default SignInWithFirebase;
