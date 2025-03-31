import React from 'react';
import { googleSignIn } from '../services/auth';

const GoogleLogin = ({ onSuccess, onError }) => {
  const handleGoogleResponse = async (response) => {
    try {
      const data = await googleSignIn(response);
      onSuccess?.(data);
    } catch (error) {
      onError?.(error);
    }
  };

  React.useEffect(() => {
    // Load Google's script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      id="g_id_onload"
      data-client_id="YOUR_GOOGLE_CLIENT_ID"
      data-callback="handleGoogleResponse"
      data-auto_prompt="false"
    >
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      />
    </div>
  );
};

export default GoogleLogin;