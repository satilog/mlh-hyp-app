import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { FaEdit, FaStar, FaLinkedin, FaTwitter } from "react-icons/fa";

interface Tutor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl: string;
  bio: string;
  subjects: string[];
  experienceYears: number;
  education: {
    degree: string;
    fieldOfStudy: string;
    school: string;
    yearOfCompletion: number;
  }[];
  certifications: {
    name: string;
    organization: string;
    yearOfCompletion: number;
  }[];
  availability: string[];
  hourlyRate: number;
  rating: number;
  reviews: {
    reviewerName: string;
    rating: number;
    comment: string;
  }[];
  languages: string[];
  location: string;
  contactNumber: string;
  website?: string;
  socialMediaLinks?: {
    linkedin?: string;
    twitter?: string;
  };
}

const Tutors: NextPage = () => {
  const router = useRouter();
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [routeChanged, setRouteChanged] = useState(false);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await fetch('/api/tutors');
        const data = await response.json();
        if (data.success) {
          setTutors(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch tutors:", error);
      }
    };

    fetchTutors();
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setRouteChanged((prev) => !prev);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup event listener on component unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <div className="custom-container min-h-screen w-full p-6">
      <div className="flex flex-row w-full p-10 py-20">
        <div className="p-4 w-full h-full pb-10">
        <img
            src={
              "https://secure.meetupstatic.com/next/images/indexPage/irl_event.svg?w=828"
            }
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-6xl font-bold mb-4 text-right text-gray-800">
            Find the Best Tutors!
          </h1>
          <p className="text-lg mb-8 text-right text-gray-700">
            Explore our list of experienced tutors to help you excel in your studies. Whether you need help with math, science, languages, or any other subject, we have the right tutor for you.
          </p>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-left text-gray-800 pb-4">
        Tutors for {" "}
        <span className="rounded-md p-2 bg-green-200">
          College <FaEdit size={25} className="inline ml-2" />
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            onClick={() => router.push(`/tutors/${tutor._id}`)}
            className="bg-white rounded-lg overflow-hidden transform hover:scale-100 transition-transform duration-300 ease-in-out cursor-pointer border-2 border-gray-400"
          >
            <img
              src={tutor.profilePictureUrl}
              alt={`${tutor.firstName} ${tutor.lastName}`}
              className="w-24 h-24 rounded-full mx-auto mt-4 object-cover"
            />
            <div className="p-6 text-center">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                {tutor.firstName} {tutor.lastName}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Subjects:</strong> {tutor.subjects.join(', ')}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Experience:</strong> {tutor.experienceYears} years
              </p>
              <p className="text-sm text-gray-600 mb-2 flex items-center justify-center">
                <strong>Rating:</strong>
                <FaStar className="text-yellow-400 ml-2" /> {tutor.rating} / 5
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Location:</strong> {tutor.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutors;
