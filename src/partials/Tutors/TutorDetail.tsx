import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { FaStar } from "react-icons/fa";

interface Tutor {
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

const TutorDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [tutor, setTutor] = useState<Tutor | null>(null);

  useEffect(() => {
    const fetchTutor = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/tutors/${id}`);
          const data = await response.json();
          if (data.success) {
            setTutor(data.data);
          }
        } catch (error) {
          console.error("Failed to fetch tutor:", error);
        }
      }
    };

    fetchTutor();
  }, [id]);

  if (!tutor) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="custom-container w-full min-h-screen p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center space-around">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4 text-center">
              {tutor.firstName} {tutor.lastName}
            </h2>
            <img
              src={tutor.profilePictureUrl}
              alt={`${tutor.firstName} ${tutor.lastName}`}
              className="w-48 h-48 rounded-lg object-cover mb-4"
            />
            <div className="flex justify-left gap-4 mt-4">
              {tutor.socialMediaLinks?.linkedin && (
                <a
                  href={tutor.socialMediaLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  LinkedIn
                </a>
              )}
              {tutor.socialMediaLinks?.twitter && (
                <a
                  href={tutor.socialMediaLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
          <div className="flex-grow h-full pt-10">
            <p className="text-lg text-gray-600">
              <strong>Subjects:</strong> {tutor.subjects.join(', ')}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Experience:</strong> {tutor.experienceYears} years
            </p>
            <p className="text-lg text-gray-600">
              <strong>Hourly Rate:</strong> ${tutor.hourlyRate}
            </p>
            <p className="text-lg text-gray-600 flex items-center">
              <strong>Rating:</strong> <FaStar className="text-yellow-400 ml-2" /> {tutor.rating} / 5
            </p>
            <p className="text-lg text-gray-600">
              <strong>Location:</strong> {tutor.location}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Languages:</strong> {tutor.languages.join(', ')}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Contact:</strong> {tutor.contactNumber}
            </p>
            {tutor.website && (
              <p className="text-lg text-gray-600">
                <strong>Website:</strong> <a href={tutor.website} target="_blank" rel="noopener noreferrer">{tutor.website}</a>
              </p>
            )}
          </div>
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mt-8 mb-4">Biography</h3>
            <p className="text-lg text-gray-600 mb-4">{tutor.bio}</p>
            <h3 className="text-2xl font-bold mt-8 mb-4">Education</h3>
            <ul className="list-disc list-inside">
              {tutor.education.map((edu, index) => (
                <li key={index} className="text-lg text-gray-600 mb-2">
                  {edu.degree} in {edu.fieldOfStudy} from {edu.school}, {edu.yearOfCompletion}
                </li>
              ))}
            </ul>
            <h3 className="text-2xl font-bold mt-8 mb-4">Certifications</h3>
            <ul className="list-disc list-inside">
              {tutor.certifications.map((cert, index) => (
                <li key={index} className="text-lg text-gray-600 mb-2">
                  {cert.name} from {cert.organization}, {cert.yearOfCompletion}
                </li>
              ))}
            </ul>
            <h3 className="text-2xl font-bold mt-8 mb-4">Availability</h3>
            <ul className="list-disc list-inside">
              {tutor.availability.map((slot, index) => (
                <li key={index} className="text-lg text-gray-600 mb-2">
                  {slot}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-1">
          <h3 className="text-2xl font-bold mb-4">Reviews</h3>
          <div className="space-y-4">
            {tutor.reviews.map((review, index) => (
              <div key={index} className="border-2 border-gray-400 p-4 rounded-md">
                <p className="text-lg text-black mb-2">
                  <strong>{review.reviewerName}</strong>
                </p>
                <p className="text-lg text-gray-600 mb-2 flex items-center">
                  Rating: <FaStar className="text-yellow-400 ml-2" /> {review.rating} / 5
                </p>
                <p className="text-lg text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetail;
