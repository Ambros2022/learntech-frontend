// TwitterLogin.js
import React from 'react';
import TwitterLogin from 'react-twitter-login';

const TwitterLoginComponent = () => {
  const authHandler = (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Handle success
      console.log(data);
    }
  };

  return (
    <TwitterLogin
      authCallback={authHandler}
      consumerKey="YOUR_TWITTER_CONSUMER_KEY"
      consumerSecret="YOUR_TWITTER_CONSUMER_SECRET"
      callbackUrl="YOUR_CALLBACK_URL"
    />
  );
};

export default TwitterLoginComponent;
