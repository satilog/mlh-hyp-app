import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAppContext } from '@/context/AppContext';

const LinkedInCallback = () => {
  const router = useRouter();
  const { code } = router.query;
  const { setFarmerId } = useAppContext();

  useEffect(() => {
    const fetchLinkedInProfile = async () => {
      if (code) {
        try {
          const response = await axios.get(`/api/linkedin/callback?code=${code}`);
          console.log("Linkedin Callback Response: ", response)
        //   const { profile, email } = response.data;

          // Assuming your API requires an email to get the farmer data
        //   const farmerResponse = await axios.get(`${process.env.API_URL}/farmer/${email.split('@')[0]}`);

        //   const farmer = farmerResponse.data;
        //   const farmerId = farmer['_id'];
        //   setFarmerId(farmerId);

          router.push({
            pathname: '/events',
          });
        } catch (error) {
          console.error('Failed to fetch LinkedIn profile', error);
        }
      }
    };

    fetchLinkedInProfile();
  }, [code, router, setFarmerId]);

  return <div>Loading...</div>;
};

export default LinkedInCallback;