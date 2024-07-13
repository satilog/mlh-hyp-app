import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ScaleIcon, UserIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useAppContext } from "@/context/AppContext";

interface Cattle {
  animal_id: string;
  breed: string;
  sex: string;
  weight: string;
}

export default function CattleList({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const router = useRouter();
  const { id } = router.query;

  const [cattles, setCattles] = useState<Cattle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchCattles(id as string);
    }
  }, [id]);

  const fetchCattles = async (farmId: string) => {
    try {
      const response = await fetch(`${process.env.API_URL}/farm/${farmId}/cattles`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cattle data");
      }

      const cattlesData = await response.json();
      const parsedCattlesData = cattlesData.map((cattleString: string) => JSON.parse(cattleString));
      setCattles(parsedCattlesData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="relative">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Cattle</h1>
        <div className="absolute top-0 left-5">
          <button
            className="bg-orange-600 py-2 px-4 text-white rounded-lg flex items-center hover:bg-orange-500"
            onClick={() => router.push("/farm")}
          >
            <ArrowLeftIcon className="h-6 w-6 mr-2" />
            <span>Farms</span>
          </button>
        </div>
      </div>
      {isLoading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cattles.map((cattle) => (
            <div
              key={cattle.animal_id}
              onClick={() => router.push(`/cattle/${cattle.animal_id}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
            >
              <div className="p-6 bg-orange-500 text-white">
                <div className="flex items-center mb-4">
                  <Image
                    src="/cattle.svg"
                    alt="Cattle"
                    width={24}
                    height={24}
                    className="mr-2"
                    style={{ filter: "invert(1)" }}
                  />
                  <h2 className="text-2xl font-semibold">{cattle.animal_id} {cattle.breed}</h2>
                </div>
                <div className="flex items-center mb-2">
                  <UserIcon className="h-5 w-5 text-gray-200 mr-2" />
                  <span>{cattle.sex}</span>
                </div>
                <div className="flex items-center">
                  <ScaleIcon className="h-5 w-5 text-gray-200 mr-2" />
                  <span>{cattle.weight} lbs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
