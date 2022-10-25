import "antd/dist/antd.css";
import { Tooltip } from "antd";

import Header from "../../components/eth/Header";
import Link from "next/link";

import { useRouter } from "next/router";

function MenuPage() {
  const router = useRouter();
  return (
    <div className="bg-[#f5e2d4] bg-[length:contain] bg-[position:50%_50%] w-full h-screen flex flex-col">
      <Header isBackButton={true} isVerify={false} wallet={false} />
      <div className="flex flex-1 flex-col items-center justify-center py-10 px-2 space-y-10">
        <span className="mb-10 text-glow-orange text-center text-lg font-extrabold">ALL APPS ARE EXCLUSIVE TO CLOWN HOLDERS ONLY &#9888;</span>
        <Tooltip title="Apply button press to show some result">
          <button
            onClick={() => router.push("http://apply.ruggedclowns.com/")}
            className="transition-all max-w-sm m-1 sm:m-2 w-full hover:bg-white hover:text-glow-orange bg-pink text-white py-2 rounded-md font-extrabold text-xs sm:text-lg outline outline-4 outline-glow-orange outline-offset-1 sm:outline-offset-4"
          >
            Apply
          </button>
        </Tooltip>
        <Tooltip title="Staking pools button press to show some result">
          <button
            onClick={() => router.push("dapp")}
            className="transition-all max-w-sm m-1 sm:m-2 w-full hover:bg-white hover:text-glow-orange bg-pink text-white py-2 rounded-md font-extrabold text-xs sm:text-lg outline outline-4 outline-glow-orange outline-offset-1 sm:outline-offset-4"
          >
            Staking pools
          </button>
        </Tooltip>
        <Tooltip title="Challanges button press to show some result">
          <button
            onClick={() => router.push("https://challenge.ruggedclowns.com/")}
            className="transition-all max-w-sm m-1 sm:m-2 w-full hover:bg-white hover:text-glow-orange bg-pink text-white py-2 rounded-md font-extrabold text-xs sm:text-lg outline outline-4 outline-glow-orange outline-offset-1 sm:outline-offset-4"
          >
            Challanges
          </button>
        </Tooltip>
        <Tooltip title="D App button press to show some result">
          <button
            onClick={() => router.push("http://social.ruggedclowns.com/")}
            className="transition-all max-w-sm m-1 sm:m-2 w-full hover:bg-white hover:text-glow-orange bg-pink text-white py-2 rounded-md font-extrabold text-xs sm:text-lg outline outline-4 outline-glow-orange outline-offset-1 sm:outline-offset-4"
          >
            Social Dapp
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default MenuPage;
