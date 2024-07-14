import Image from "next/image";
// import ThemeToggle from "@/components/Theme/ThemeToggle";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-center w-screen p-3 mt-2 items-center border-t-[1.5px] custom-border-color gap-4">
      Copyrights Reserved by <p className="font-bold">
      H<span className="font-bold text-green-600">O</span>BN<span className="font-bold text-green-600">O</span>B
      </p>
      {/* <Image
        className="hover:cursor-pointer"
        src="/LankaWikiShortBlackLogo.png"
        alt="Logo"
        width={50}
        height={40}
        onClick={() => router.push("/")}
      /> */}
    </div>
  );
}
