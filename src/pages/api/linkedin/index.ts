// pages/api/linkedin.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import dbConnect from '@/lib/mongo';
import User from '@/models/User';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI;

  try {
    // Exchange authorization code for access token
    const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // Fetch user profile data
    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const profileData = profileResponse.data;
    const emailData = emailResponse.data.elements[0]['handle~'];

    await dbConnect();

    // Save user data to MongoDB
    const user = await User.findOneAndUpdate(
      { linkedinId: profileData.id },
      {
        linkedinId: profileData.id,
        firstName: profileData.localizedFirstName,
        lastName: profileData.localizedLastName,
        email: emailData.emailAddress,
        profilePicture: profileData.profilePicture?.['displayImage~'].elements[0].identifiers[0].identifier || '',
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
