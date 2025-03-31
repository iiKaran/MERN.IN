// Authentication service for handling Google OAuth

const BASE_URL = 'YOUR_BACKEND_URL';

export const googleSignIn = async (googleResponse) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: googleResponse.credential }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Google authentication failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/status`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Authentication check failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Auth status check error:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    return true;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};