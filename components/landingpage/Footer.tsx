import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <div className="h-96 grid grid-cols-1 lg:grid-cols-3 place-content-center place-items-center bg-[#a7cbf2] border-b-2 border-black gap-8 px-10">
        <div className="space-r text-3xl lg:text-4xl">
          Play a game and win up to 10K in rewards
        </div>
        <a
          href="https://game-qrcode.web.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-max flex gap-x-2 items-center py-2 px-10 border-[1.5px] border-black rounded bg-white shadow-[4px_4px_0_0_rgb(0,0,0)] agrandir"
        >
          <div className="w-8 h-8 relative">
            <Image
              src="/images/pinata.png"
              alt="pinata"
              layout="fill"
              objectFit="scale-down"
            />
          </div>
          <div className="text-xl">Play</div>
        </a>
      </div>
      <div className=" h-40 flex justify-between items-center p-5 bg-black relative">
        <div className="w-10 sm:w-16 h-10 sm:h-16 relative basis-1/4">
          <Image
            src="/images/logo.png"
            alt="logo"
            layout="fill"
            objectFit="scale-down"
          />
        </div>
        <div className="hidden lg:flex gap-x-3 space-r items-center text-xl basis-1/2">
          <div className="p-1 rounded-md bg-white">
            <div className="w-8 h-8 relative">
              <Image
                src="/images/eth.png"
                alt="eth"
                layout="fill"
                objectFit="scale-down"
              />
            </div>
          </div>
          <a
            className="uppercase text-white hover:underline"
            href="https://ftmscan.com/address/0xb4b564D13AC7cDE29D4631AB7E3c44689320BF03"
            target="_blank"
            rel="noreferrer"
          >
            0xb4b564D13AC7cDE29D4631AB7E3c44689320BF03
          </a>
          <div className="p-1 rounded-md bg-white">
            <div className="w-8 h-8 relative">
              <Image
                src="/images/contract.png"
                alt="contract"
                layout="fill"
                objectFit="scale-down"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-5">
          <a
            href="https://tofunft.com/collection/rugged-clowns-2/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 relative">
              <Image
                src="/images/tozfu.png"
                alt="tozfu"
                layout="fill"
                objectFit="scale-down"
              />
            </div>
          </a>
          <a
            href="https://www.pumpkin.financial/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 relative">
              <Image
                src="/images/pumpkin.png"
                alt="pumpkin"
                layout="fill"
                objectFit="scale-down"
              />
            </div>
          </a>
          <a
            href="https://discord.gg/ku6x6nqhan"
            target="_blank"
            rel="noreferrer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 relative">
              <Image
                src="/images/discord.png"
                alt="discord"
                layout="fill"
                objectFit="scale-down"
              />
            </div>
          </a>
          <a
            href="https://twitter.com/ruggedclowns?s=21&t=5FtF0nbfE6ZVBRcjGWudAA"
            target="_blank"
            rel="noreferrer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 relative">
              <Image
                src="/images/twitter.png"
                alt="twitter"
                layout="fill"
                objectFit="scale-down"
              />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
