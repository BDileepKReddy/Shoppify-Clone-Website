import React from 'react';
import { supabase } from '../helper/supabaseClient';

const GoogleAuth = () => {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
      <button onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleAuth;
