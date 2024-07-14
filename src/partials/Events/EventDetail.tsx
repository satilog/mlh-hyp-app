import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import ReactMarkdown from "react-markdown";

interface Event {
  _id: string;
  title: string;
  host: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  price: string;
  imageUrl: string;
  description: string;
  category: string;
  tags: string[];
  contactEmail: string;
  website: string;
  capacity: number;
  registrationLink: string;
}

interface User {
  id: string;
  name: string;
  avatarUrl: string;
  interests: string[];
  availability: string[];
  score: number;
  matchExplanation: string;
}

const EventDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<Event | null>(null);
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);
  const currentUser = {
    interests: ["tech", "art", "music"],
    availability: ["2024-09-23", "2024-08-17"],
  }; // Replace with the actual current user data
  const users = [
    {
      id: "1",
      name: "Alice",
      avatarUrl: "https://example.com/alice.jpg",
      interests: ["tech", "science"],
      availability: ["2024-09-23"],
    },
    {
      id: "2",
      name: "Bob",
      avatarUrl: "https://example.com/bob.jpg",
      interests: ["art", "music"],
      availability: ["2024-08-17"],
    },
  ]; // Replace with the actual users data

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/events/${id}`);
          const data = await response.json();
          if (data.success) {
            setEvent(data.data);
          }
        } catch (error) {
          console.error("Failed to fetch event:", error);
        }
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (event) {
      const relevantUsers = users
        .map((user) => {
          const commonInterests = user.interests.filter((interest) =>
            currentUser.interests.includes(interest)
          ).length;
          const commonAvailability = user.availability.filter((avail) =>
            event.date.includes(avail)
          ).length;
          const matchExplanation = `Interests: ${commonInterests}, Availability: ${commonAvailability}`;

          return {
            ...user,
            score: commonInterests + commonAvailability,
            matchExplanation,
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      setSuggestedUsers(relevantUsers);
    }
  }, [event, users, currentUser]);

  if (!event) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  return (
    <div className="custom-container w-full min-h-screen p-4 sm:p-6">
      <div className="">
        <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-green-200 font-bold px-4 py-2 rounded-md">
            {event.date} @ {event.time} CST
          </span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-auto rounded-md object-cover mb-4"
          />
          <h3 className="text-lg font-bold mb-2">Details</h3>
          <ReactMarkdown className="prose mb-4">{event.description}</ReactMarkdown>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <h4 className="text-md font-bold mb-2">Hosted by</h4>
              <p className="text-gray-700">{event.host}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:w-1/3 gap-8">
          <div className="">
            <h4 className="text-md font-bold mb-2">Location</h4>
            <p className="text-gray-700">{event.location}</p>
            <div className="mt-4">
              <iframe
                src={`https://maps.google.com/maps?q=${event.location}&output=embed`}
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="rounded-lg p-4 border-2 border-gray-400">
            <h4 className="text-md font-bold mb-2">
              Join with others <span className="text-green-600">(AI Suggested)</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center w-full space-x-2 bg-gray-200 p-2 px-4 rounded-md border-green-700"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-gray-700">
                    {user.name} ({user.matchExplanation})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
