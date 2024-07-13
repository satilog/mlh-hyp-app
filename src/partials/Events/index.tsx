import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useAppContext } from "@/context/AppContext";
import { FaEdit } from 'react-icons/fa';

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
}

const Events: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  // const { userId } = useAppContext();
  const userId = 123;

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id || userId) {
      fetchEvents((id || userId) as string);
    }
  }, [id, userId]);

  const fetchEvents = async (userId: string) => {
    try {
      // Dummy data
      const eventsData = [
        {
          _id: "1",
          title: "Grill your Code!",
          host: "WANNADO!",
          date: "SAT, JUL 27",
          time: "3:00 PM CST",
          location: "Regina, SK",
          attendees: 40,
          price: "Free",
          imageUrl: "https://static.vecteezy.com/system/resources/thumbnails/028/716/798/small_2x/charcoal-fire-dance-flaming-grill-set-against-a-black-cooking-background-ai-generated-photo.jpg",
        },
        {
          _id: "2",
          title: "Wascana Trails Walk",
          host: "Wascana Wanderers Walking Club",
          date: "WED, JUL 17",
          time: "6:00 AM CST",
          location: "Regina, SK",
          attendees: 3,
          price: "Free",
          imageUrl: "https://tctrail.ca/wp-content/uploads/2023/03/SK_Wascana-Valley-Trails-1_resized.jpg",
        },
        {
          _id: "3",
          title: "French conversation club at 6 pm",
          host: "Un Rendezvous Charmant",
          date: "TUE, JUL 23",
          time: "5:00 PM CST",
          location: "Regina, SK",
          attendees: 3,
          price: "Free",
          imageUrl: "https://c8.alamy.com/comp/2A25AW3/illustration-dated-1906-in-french-magazine-depicting-a-man-and-woman-in-a-business-conversation-as-other-people-pass-in-the-background-2A25AW3.jpg",
        },
        {
          _id: "4",
          title: "RCS Weekly Coffee Chat",
          host: "Regina Creative Social",
          date: "SUN, JUL 14",
          time: "12:30 PM CST",
          location: "Regina, SK",
          attendees: 2,
          price: "Free",
          imageUrl: "https://media.istockphoto.com/id/1344874443/photo/shot-of-two-unrecognisable-businesspeople-having-coffee-at-a-conference.webp?b=1&s=170667a&w=0&k=20&c=OICywS7alhzsZrMRNOmH1QeyLofEuwyvosUF0NmJhVo=",
        },
      ];

      setEvents(eventsData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="custom-container min-h-screen w-full p-6">
      <h1 className="text-2xl font-bold mb-4 text-left text-gray-800">Events near <span className="rounded-md p-2 bg-green-200">Regina, SK <FaEdit size={25} className="inline ml-2" /></span></h1>
      <p className="text-lg mb-8 text-left text-gray-700">Explore events that help socialize university students. These events are a great way to meet new people, make friends, and enjoy various activities together.</p>
      {isLoading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              onClick={() => router.push(`/event/${event._id}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-100 transition-transform duration-300 ease-in-out cursor-pointer"
            >
              <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">{event.title}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Hosted by:</strong> {event.host}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Date:</strong> {event.date}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Attendees:</strong> {event.attendees} going
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Price:</strong> {event.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
