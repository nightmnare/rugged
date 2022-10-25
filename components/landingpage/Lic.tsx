import React from 'react';
import Image from 'next/image';

import mintHeroImg from 'public/images/mint-hero.png';
import licImg from 'public/images/lic.png';

export default function Lic() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x-[0.25rem] divide-black border-b-[0.25rem] border-black relative">
      <div className="flex justify-center items-center py-10 pt-20 lg:pt-16 lg:pb-16">
        <div className="flex flex-col items-center justify-center gap-16">
          <div className="w-72 relative">
            <Image src={mintHeroImg} alt="mint-hero" />
          </div>
          <a
            href="https://app.ruggedclowns.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-max h-max py-4 px-20 border-[1.5px] border-black rounded bg-white shadow-[4px_4px_0_0_rgb(0,0,0)] agrandir"
          >
            Open dapp
          </a>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-12 py-10 pt-16 lg:pt-16 pb-16">
        <div className="w-80 relative">
          <Image src={licImg} alt="license" />
        </div>
        <a
          href="/apply"
          target="_blank"
          rel="noreferrer noopener"
          className="w-max h-max py-4 px-20 border-[1.5px] border-black rounded bg-white shadow-[4px_4px_0_0_rgb(0,0,0)] agrandir"
        >
          Claim License
        </a>
      </div>
    </div>
  );
}
