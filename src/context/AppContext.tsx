import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type Event = {
  _id: string;
  title: string;
  host: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  price: string;
  imageUrl: string;
};

type User = {
  id: string;
  name: string;
  avatarUrl: string;
  interests: string[];
  availability: string[];
  location: string;
};

type CurrentUser = {
  id: string;
  name: string;
  avatarUrl: string;
  interests: string[];
  availability: string[];
  location: string;
};

type AppContextType = {
  farmerId: string | null;
  setFarmerId: Dispatch<SetStateAction<string | null>>;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  fetchEvents: (userId: string) => void;
  users: User[];
  currentUser: CurrentUser;
};

const defaultState: AppContextType = {
  farmerId: null,
  setFarmerId: () => {},
  events: [],
  setEvents: () => {},
  fetchEvents: () => {},
  users: [],
  currentUser: {
    id: "11",
    name: "Current User",
    avatarUrl: "https://randomuser.me/api/portraits/men/11.jpg",
    interests: ["coding", "hiking", "reading"],
    availability: ["SAT, JUL 27", "TUE, JUL 23"],
    location: "Regina, SK",
  },
};

const AppContext = createContext<AppContextType>(defaultState);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [farmerId, setFarmerId] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser>(defaultState.currentUser);

  const fetchEvents = async (userId: string) => {
    try {
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
          imageUrl:
            "https://static.vecteezy.com/system/resources/thumbnails/028/716/798/small_2x/charcoal-fire-dance-flaming-grill-set-against-a-black-cooking-background-ai-generated-photo.jpg",
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
          imageUrl:
            "https://tctrail.ca/wp-content/uploads/2023/03/SK_Wascana-Valley-Trails-1_resized.jpg",
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
          imageUrl:
            "https://c8.alamy.com/comp/2A25AW3/illustration-dated-1906-in-french-magazine-depicting-a-man-and-woman-in-a-business-conversation-as-other-people-pass-in-the-background-2A25AW3.jpg",
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
          imageUrl:
            "https://media.istockphoto.com/id/1344874443/photo/shot-of-two-unrecognisable-businesspeople-having-coffee-at-a-conference.webp?b=1&s=170667a&w=0&k=20&c=OICywS7alhzsZrMRNOmH1QeyLofEuwyvosUF0NmJhVo=",
        },
      ];

      setEvents(eventsData);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const userId = "123"; // Replace with the actual user ID
    fetchEvents(userId);
  }, []);

  useEffect(() => {
    const dummyUsers = [
      {
        id: "1",
        name: "Alice",
        avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
        interests: ["coding", "hiking", "reading"],
        availability: ["SAT, JUL 27", "SUN, JUL 14"],
        location: "Regina, SK",
      },
      {
        id: "2",
        name: "Bob",
        avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
        interests: ["music", "gaming", "cooking"],
        availability: ["WED, JUL 17", "TUE, JUL 23"],
        location: "Regina, SK",
      },
      {
        id: "3",
        name: "Charlie",
        avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
        interests: ["sports", "traveling", "photography"],
        availability: ["SUN, JUL 14", "WED, JUL 17"],
        location: "Regina, SK",
      },
      {
        id: "4",
        name: "David",
        avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
        interests: ["coding", "gaming", "reading"],
        availability: ["TUE, JUL 23", "SUN, JUL 14"],
        location: "Regina, SK",
      },
      {
        id: "5",
        name: "Eve",
        avatarUrl: "https://randomuser.me/api/portraits/women/5.jpg",
        interests: ["cooking", "hiking", "music"],
        availability: ["SAT, JUL 27", "WED, JUL 17"],
        location: "Regina, SK",
      },
      {
        id: "6",
        name: "Frank",
        avatarUrl: "https://randomuser.me/api/portraits/men/6.jpg",
        interests: ["sports", "traveling", "music"],
        availability: ["TUE, JUL 23", "SAT, JUL 27"],
        location: "Regina, SK",
      },
      {
        id: "7",
        name: "Grace",
        avatarUrl: "https://randomuser.me/api/portraits/women/7.jpg",
        interests: ["coding", "reading", "photography"],
        availability: ["SUN, JUL 14", "WED, JUL 17"],
        location: "Regina, SK",
      },
      {
        id: "8",
        name: "Hank",
        avatarUrl: "https://randomuser.me/api/portraits/men/8.jpg",
        interests: ["music", "traveling", "gaming"],
        availability: ["TUE, JUL 23", "SAT, JUL 27"],
        location: "Regina, SK",
      },
      {
        id: "9",
        name: "Ivy",
        avatarUrl: "https://randomuser.me/api/portraits/women/9.jpg",
        interests: ["cooking", "hiking", "photography"],
        availability: ["WED, JUL 17", "SUN, JUL 14"],
        location: "Regina, SK",
      },
      {
        id: "10",
        name: "Jack",
        avatarUrl: "https://randomuser.me/api/portraits/men/10.jpg",
        interests: ["sports", "music", "traveling"],
        availability: ["SAT, JUL 27", "WED, JUL 17"],
        location: "Regina, SK",
      },
    ];

    setUsers(dummyUsers);
  }, []);

  return (
    <AppContext.Provider
      value={{
        farmerId,
        setFarmerId,
        events,
        setEvents,
        fetchEvents,
        users,
        currentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
