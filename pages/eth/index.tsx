import 'antd/dist/antd.css';
import { Tooltip } from 'antd';

import Header from '@components/eth/Header';
import Link from 'next/link';

import { useRouter } from 'next/router';

function MainPages() {
  const router = useRouter();
  return (
    <div className="bg-[url(/images/clown.jpg)] bg-no-repeat bg-[#f5e2d4] bg-[length:contain] bg-[position:50%_50%] w-full h-screen flex flex-col">
      <Header isBackButton={false} isVerify={true} wallet={false} />
      <div className="flex flex-1 flex-row items-end justify-center py-10">
        <Tooltip title="D App button press to show some result">
          <button
            onClick={() => router.push('eth/dapp')}
            className="transition-all max-w-sm m-1 sm:m-2 flex-1 hover:bg-white hover:text-glow-orange bg-glow-orange text-white py-2 rounded-md font-extrabold text-xs sm:text-lg hover:outline hover:outline-4 hover:outline-glow-orange outline-offset-1 sm:outline-offset-4"
          >
            D App
          </button>
        </Tooltip>
        <Tooltip title="Mint button press to show some result">
          <button
            onClick={() => router.push('eth/mint')}
            className="transition-all max-w-sm m-1 sm:m-2 flex-1 hover:bg-white hover:text-pink bg-pink text-white py-2 rounded-md font-extrabold  text-xs sm:text-lg hover:outline hover:outline-4 hover:outline-pink outline-offset-1 sm:outline-offset-4"
          >
            Mint
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default MainPages;
