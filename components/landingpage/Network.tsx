import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Network() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  border-b-[0.25rem] border-black relative">
      <div className="flex justify-center items-center py-10 pt-20 lg:pt-16 lg:pb-16">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="w-[14rem] h-72 p-8">
            <div className="w-full h-full relative">
              <Image
                src="/images/FTM_coin.png"
                layout="fill"
                alt="FTM"
                objectFit="scale-down"
              />
            </div>
          </div>
          <Link href="/ftm">
            <span className="w-max h-max cursor-pointer py-4 px-20 border-[1.5px] border-black rounded bg-white shadow-[4px_4px_0_0_rgb(0,0,0)] agrandir">
              Fantom
            </span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-8 py-10 pt-16 lg:pt-16 pb-16">
        <div className="w-72 h-72 relative">
          <Image
            src="/images/coins/ETH_coin.svg"
            alt="logo"
            layout="fill"
            objectFit="scale-down"
          />
        </div>
        <Link href="/">
          <span className="w-max h-max cursor-pointer py-4 px-20 border-[1.5px] border-black rounded bg-white shadow-[4px_4px_0_0_rgb(0,0,0)] agrandir">
            Ethereum
          </span>
        </Link>
      </div>
    </div>
  );
}
