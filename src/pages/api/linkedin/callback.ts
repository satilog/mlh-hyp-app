// // pages/api/linkedin.ts

// pages/api/linkedin.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongo';
import User from '@/models/User';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Bypass LinkedIn OAuth and create dummy data
    await dbConnect();

    // Generate dummy user data
    const dummyData = {
      linkedinId: 'dummyLinkedinId123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      profilePicture: 'https://media.licdn.com/dms/image/D5603AQEPNfAKkRkbHg/profile-displayphoto-shrink_400_400/0/1664529744668?e=1726099200&v=beta&t=s05G-czJ2pebs3atMOGKdVKNHUxcNYX17zPSMjHEXTg',
    };

    // Save dummy user data to MongoDB
    const user = await User.findOneAndUpdate(
      { linkedinId: dummyData.linkedinId },
      dummyData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error during dummy user creation process:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;

// import type { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';
// import dbConnect from '@/lib/mongo';
// import User from '@/models/User';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { code, state } = req.query;

//   if (!code) {
//     return res.status(400).json({ error: 'Authorization code is required' });
//   }

//   const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
//   const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
//   const redirectUri = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI;
// //   const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI || "");

//   try {
//     console.log("Client ID:", clientId);
//     console.log("Client Secret:", clientSecret);
//     console.log("Redirect URI:", redirectUri);
//     console.log("Authorization Code:", code);

//     // Exchange authorization code for access token
//     const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
//       params: {
//         grant_type: 'authorization_code',
//         code: code as string,
//         redirect_uri: redirectUri,
//         client_id: clientId,
//         client_secret: clientSecret,
//       },
//     });

//     const accessToken = tokenResponse.data.access_token;

//     // Fetch user profile data
//     const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const profileData = profileResponse.data;
//     const emailData = emailResponse.data.elements[0]['handle~'];

//     await dbConnect();

//     // Save user data to MongoDB
//     const user = await User.findOneAndUpdate(
//       { linkedinId: profileData.id },
//       {
//         linkedinId: profileData.id,
//         firstName: profileData.localizedFirstName,
//         lastName: profileData.localizedLastName,
//         email: emailData.emailAddress,
//         profilePicture: profileData.profilePicture?.['displayImage~'].elements[0].identifiers[0].identifier || '',
//       },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );

//     res.status(200).json({ user });
//   } catch (error) {
//     console.error("Error during LinkedIn OAuth process:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// export default handler;

