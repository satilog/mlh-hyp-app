import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ScaleIcon, UserIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

interface Cattle {
  animal_id: string;
  breed: string;
  gender: string;
  weight: number;
  date_of_birth: string;
}

interface Farm {
  _id: string;
  name: string;
  location: string;
  size_acres: number;
}

export default function CattleList() {
  const router = useRouter();
  const { id } = router.query;

  const [cattles, setCattles] = useState<Cattle[]>([]);
  const [farm, setFarm] = useState<Farm | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchFarm(id as string);
      fetchCattles(id as string);
    }
  }, [id]);

  const fetchFarm = async (farmId: string) => {
    try {
      const response = await fetch(`${process.env.API_URL}/farm/${farmId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch farm data");
      }

      const farmData = await response.json();
      setFarm(JSON.parse(farmData));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCattles = async (farmId: string) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/farm/${farmId}/cattles`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cattle data");
      }

      const cattlesData = await response.json();
      console.log(cattlesData);
      const parsedCattlesData = cattlesData.map((cattleString: any) =>
        JSON.parse(cattleString)
      );
      setCattles(parsedCattlesData);
      console.log(parsedCattlesData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAge = (dateOfBirth: any) => {
    const birthDate = new Date(dateOfBirth.$date);
    console.log("Date Birth: ", birthDate);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} y ${months} m`;
  };

  const getGenderType = (gender: string) => {
    const maleTypes = ["Bull", "Steer"];
    const femaleTypes = ["Heifer", "Cow"];

    if (gender.toLowerCase() === "male") {
      return maleTypes[Math.floor(Math.random() * maleTypes.length)];
    } else if (gender.toLowerCase() === "female") {
      return femaleTypes[Math.floor(Math.random() * femaleTypes.length)];
    }
    return gender; // fallback in case of unexpected gender value
  };

  return (
    <div className="custom-container min-h-screen w-full p-6">
      <div className="relative mb-4">
        {farm && (
          <div className="mt-4 mb-8">
            <h2 className="text-3xl font-bold text-left text-gray-800 mb-2">
              {farm.name}
            </h2>
            <p className="text-md text-left text-gray-600">
              Location: {farm.location}
            </p>
            <p className="text-md text-left text-gray-600">
              Size: {farm.size_acres} acres
            </p>
          </div>
        )}
        <h1 className="text-2xl font-bold text-left text-gray-800">
          Cattle in farm
        </h1>
      </div>
      {isLoading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-4 border-b-2 border-gray-200">
            <div className="font-semibold text-gray-700">Breed</div>
            <div className="font-semibold text-gray-700">Type</div>
            <div className="font-semibold text-gray-700">Weight</div>
            <div className="font-semibold text-gray-700">Age</div>
          </div>
          {cattles.map((cattle) => (
            <div
              key={cattle.animal_id}
              className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
              onClick={() => router.push(`/cattle/${cattle.animal_id}`)}
            >
              <div className="flex items-center text-gray-800">
                {cattle.breed}
              </div>
              <div className="flex items-center text-gray-800 gap-2">
                {/* <UserIcon className="h-5 w-5 text-gray-500 mr-2" /> */}
                {cattle.gender == "Female" ? (
                  <img
                    width="22"
                    height="22"
                    src="https://img.icons8.com/metro/26/cow.png"
                    alt="cow"
                  />
                ) : (
                  <img
                    width="26"
                    height="26"
                    src="https://img.icons8.com/ios-glyphs/30/bull.png"
                    alt="bull"
                  />
                )}
                {getGenderType(cattle.gender)}
              </div>
              <div className="flex items-center text-gray-800">
                <ScaleIcon className="h-5 w-5 text-gray-500 mr-2" />
                {cattle.weight} lbs
              </div>
              <div className="flex items-center text-gray-800">
                {calculateAge(cattle.date_of_birth)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
