import React from 'react';

const LinkedInSignIn = () => {
  const handleLinkedInLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
    const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI || "");
    const state = encodeURIComponent('foobar');
    const scope = encodeURIComponent('email');
    // const scope = encodeURIComponent('openid profile email w_member_social');

    if (!clientId || !redirectUri) {
      console.error('LinkedIn Client ID or Redirect URI is missing');
      return;
    }

    // Step 1: Redirect the user to LinkedIn's OAuth 2.0 authorization endpoint
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
    window.location.href = authUrl;
  };

  return (
    <button onClick={handleLinkedInLogin}>
      Sign in with LinkedIn
    </button>
  );
};

export default LinkedInSignIn;

// https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86myd38h33jru5&redirect_uri=https%3A%2F%2Fnfc-herd-app.vercel.app%2F&state=123&scope=profile
// https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86myd38h33jru5&redirect_uri=https%3A%2F%2Fnfc-herd-app.vercel.app%2F&state=123&scope=profile
