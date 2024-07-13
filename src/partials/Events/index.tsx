import { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useAppContext } from "@/context/AppContext";
import { FaEdit } from "react-icons/fa";

const Events: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { events, fetchEvents } = useAppContext();
  const userId = "123"; // Replace with the actual user ID

  useEffect(() => {
    if (id || userId) {
      fetchEvents((id || userId) as string);
    }
  }, [events]);

  return (
    <div className="custom-container min-h-screen w-full p-6">
      <div className="flex flex-row w-full p-10 py-20">
        <div>
          <h1 className="text-6xl font-bold mb-4 text-left text-gray-800">
            Attend more events, meet more people!
          </h1>
          <p className="text-lg mb-8 text-left text-gray-700">
            Explore events that help socialize university students. These events
            are a great way to meet new people, make friends, and enjoy various
            activities together.
          </p>
        </div>
        <div className="p-4 w-full h-full pb-10">
          <img
            src={
              "https://secure.meetupstatic.com/next/images/indexPage/irl_event.svg?w=828"
            }
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-left text-gray-800 pb-4">
        Events near{" "}
        <span className="rounded-md p-2 bg-green-200">
          Regina, SK <FaEdit size={25} className="inline ml-2" />
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            onClick={() => router.push(`/event/${event._id}`)}
            className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-100 transition-transform duration-300 ease-in-out cursor-pointer"
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                {event.title}
              </h2>
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
    </div>
  );
};

export default Events;
