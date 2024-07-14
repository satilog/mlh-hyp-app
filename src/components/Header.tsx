import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useAppContext } from "@/context/AppContext";
import { useState } from "react";

export default function Header(props: any) {
  // const { isHeaderFullWidth } = useAppContext();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    { name: "Home", href: "/landing" },
    { name: "Events", href: "/events" },
    { name: "Tutors", href: "/tutors" },
  ];

  return (
    <div className="flex w-full items-center justify-around custom-bg-white-color h-20 border-b-[1.5px] custom-border-color">
      <div
        className={`container custom-container px-5 flex justify-between items-center custom-bg-invert-color`}
      >
        <div
          className="custom-text-color text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/landing")}
        >
          H<span className="font-bold text-green-600">O</span>BN<span className="font-bold text-green-600">O</span>B
          {/* <Image
            className="hover:cursor-pointer -ml-6"
            src="/smh-logo.png"
            alt="Logo"
            width={200}
            height={220}
            onClick={() => router.push("/")}
          /> */}
        </div>

        {/* Tabs and Sign Up Button Group */}
        <div className="flex items-center gap-4">
          {/* Mobile Dropdown Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-md custom-text-color focus:outline-none"
            >
              Menu
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className="custom-text-color text-md cursor-pointer hover:bg-gray-100 px-4 py-2"
                    onClick={() => {
                      router.push(tab.href);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {tab.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Tabs for Larger Screens */}
          <div className="hidden sm:flex flex-row mr-8 gap-8">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className="custom-text-color text-md cursor-pointer hover:text-red-600"
                onClick={() => router.push(tab.href)}
              >
                {tab.name}
              </div>
            ))}
          </div>

          {/* Sign Up Button */}
          {/* <button
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </button> */}
        </div>
      </div>
    </div>
  );
}
