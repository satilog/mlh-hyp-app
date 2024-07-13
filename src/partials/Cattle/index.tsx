import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

interface HealthRecord {
  date: { $date: number };
  condition: string;
  treatment: string;
}

interface VaccinationRecord {
  date: { $date: number };
  vaccine_name: string;
  administered_by: string;
}

interface Cow {
  _id: { $oid: string };
  rfid: string;
  animal_id: string;
  breed: string;
  date_of_birth: { $date: number };
  gender: string;
  farm_id: string;
  location: string;
  health_records: HealthRecord[];
  vaccination_records: VaccinationRecord[];
  weight: number;
  last_update: { $date: number };
}

const cattleImage: any = {
  Holstein:
    "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRJwQVvFH8329Lln5iHUjJteBdHmbSZJOuDPRp-7cIui_xcnMnY",
  Angus:
    "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSq577G-a-fuO7wpK16KJtC8-1805uPFqOZVjRR_agQrsXmLsfgidU8qVReybLb1CGq1-2bVmL8jIBwTAc",
  Hereford:
    "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcToHtYuyKGadcOP1pKr_s4YEMy1Td_RF6pbuOp7F4MxiSvQ9s_Sov0rnWPOscT9bALaAuLlunkZ65rBdBk",
  Jersey: "https://cdn.britannica.com/22/522-050-25222A61/Jersey-cow.jpg",
  Simmental:
    "https://i.pinimg.com/564x/4d/80/ff/4d80ff37ad52350700cc2100b1904ad4.jpg",
};

export default function CowDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [cow, setCow] = useState<Cow | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchCow(id as string);
    }
  }, [id]);

  const fetchCow = async (cowId: string) => {
    try {
      const response = await fetch(`${process.env.API_URL}/cattle/${cowId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cow data");
      }

      const cowData = await response.json();
      setCow(JSON.parse(cowData));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: { $date: number }) => {
    const dateObject = new Date(date.$date);
    return dateObject.toLocaleDateString();
  };

  const calculateAge = (dateOfBirth: { $date: number }) => {
    const birthDate = new Date(dateOfBirth.$date);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return `${years} years ${months} months`;
  };

  return (
    <div className="custom-container w-full min-h-screen p-4 sm:p-6">
      {isLoading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : cow ? (
        <div className="bg-white rounded-lg shadow-md gap-8 sm:gap-16 overflow-hidden mt-4 p-4 sm:p-6">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <img
              src={cattleImage[cow.breed]}
              alt={cow.breed}
              className="w-full h-auto sm:w-48 sm:h-48 rounded-md object-cover mb-4 sm:mb-0"
            />
            <div className="flex flex-col gap-4 w-full">
              <h2 className="text-xl sm:text-2xl font-bold">{cow.breed}</h2>
              <table className="w-full text-left text-gray-800 text-sm sm:text-lg">
                <tbody>
                  <tr>
                    <th className="w-1/4 font-bold">RFID</th>
                    <td>{cow.rfid}</td>
                  </tr>
                  <tr>
                    <th className="w-1/4 font-bold">Gender</th>
                    <td>{cow.gender}</td>
                  </tr>
                  <tr>
                    <th className="w-1/4 font-bold">Location</th>
                    <td>{cow.location}</td>
                  </tr>
                  <tr>
                    <th className="w-1/4 font-bold">Weight</th>
                    <td>{cow.weight} lbs</td>
                  </tr>
                  <tr>
                    <th className="w-1/4 font-bold">Date of Birth</th>
                    <td>{formatDate(cow.date_of_birth)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-left text-gray-800 mt-6 sm:mt-8">
            Health Records
          </h3>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 p-2 sm:p-4 border-b-2 border-gray-200 text-lg sm:text-md">
              <div className="font-semibold text-gray-700">Date</div>
              <div className="font-semibold text-gray-700">Condition</div>
              <div className="hidden sm:block font-semibold text-gray-700">
                Treatment
              </div>
            </div>
            {cow.health_records.map((record, index) => (
              <div
                key={index}
                className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 p-2 sm:p-4 border-b border-gray-200 text-md sm:text-md"
              >
                <div className="text-gray-800">{record.condition}</div>
                <div className="hidden sm:block text-gray-800">
                  {record.treatment}
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-left text-gray-800 mt-6 sm:mt-8">
            Vaccination Records
          </h3>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 p-2 sm:p-4 border-b-2 border-gray-200 text-lg sm:text-md">
              <div className="font-semibold text-gray-700">Date</div>
              <div className="font-semibold text-gray-700">Vaccine</div>
              <div className="hidden sm:block font-semibold text-gray-700">
                Administered By
              </div>
            </div>
            {cow.vaccination_records.map((record, index) => (
              <div
                key={index}
                className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 p-2 sm:p-4 border-b border-gray-200 text-md sm:text-md"
              >
                <div className="text-gray-800">{record.vaccine_name}</div>
                <div className="hidden sm:block text-gray-800">
                  {record.administered_by}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">No data available</p>
      )}
    </div>
  );
}
