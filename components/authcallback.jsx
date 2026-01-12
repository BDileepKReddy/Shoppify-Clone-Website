import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabaseClient';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        console.error('Failed to get session', error);
        return;
      }

      const createdAt = new Date(session.user.created_at).getTime();
      const signedInAt = new Date(session.user.last_sign_in_at).getTime();

      if (Math.abs(signedInAt - createdAt) < 5000) {
        navigate('/where-do-you-sell');
      } else {
        navigate('/dashboard');
      }
    };

    checkLogin();
  }, [navigate]);

  return <p>Signing you in...</p>; // Optional: Add spinner
};

export default AuthCallback;
