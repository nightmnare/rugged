import * as React from 'react';
import Image from 'next/image';
export type DappCardProps = {
  coin: string;
  earn: string;
  apy: number;
  staked: number;
  daiEarned: number;
};

const DappCard: React.FC<DappCardProps> = (props) => {
  return (
    <div className="px-2">
      <div className="w-full m-auto my-4 max-w-xs bg-white text-glow-orange flex flex-col rounded-xl px-6 py-4">
        <div className="flex flex-row items-center justify-between my-1 mb-4 mt-4">
          <span className="text-glow-orange text-2xl font-extrabold tracking-wide">
            Stake
          </span>
          <div className="w-16 h-16 relative">
            <Image
              src={props.coin}
              alt=""
              layout="fill"
              objectFit="scale-down"
            />
          </div>
        </div>
        <hr />
        <div className="flex flex-row items-center justify-between my-1 mt-4">
          <span className="text-glow-orange text-lg font-bold">Stake:</span>
          <span className="text-glow-orange text-lg font-extrabold">
            {props.earn}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between my-1 mt-1">
          <span className="text-glow-orange text-lg font-bold">Earn:</span>
          <span className="text-glow-orange text-lg font-extrabold">
            {props.earn}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between my-1">
          <span className="text-glow-orange text-lg font-bold">APY:</span>
          <span className="text-glow-orange text-lg font-extrabold">
            {props.apy}%
          </span>
        </div>
        <div className="flex flex-row items-center justify-between my-1">
          <span className="text-glow-orange text-lg font-bold">Staked:</span>
          <span className="text-glow-orange text-lg font-extrabold">
            {props.staked}
          </span>
        </div>
        <div className="flex flex-row items-center justify-between my-4">
          <div className="flex flex-col">
            <span className="text-glow-orange text-lg font-bold">
              {props.earn} Earned
            </span>
            <span className="text-glow-orange text-lg font-extrabold">
              {props.daiEarned}
            </span>
          </div>
          <button className="transition-all bg-glow-orange px-10 py-2 rounded-lg text-white font-extrabold tracking-wide mb-4 outline outline-2 outline-offset-2 outline-glotext-glow-orange hover:bg-white hover:text-glow-orange">
            Claim
          </button>
        </div>
        {/* <Divider className="text-2xl pt-1 rounded-full" /> */}
        <input className="outline-none active:outline-none border-b-2 border-glow-orange text-glow-orange text-lg font-extrabold" />
        <div className="flex flex-row items-center justify-start mt-4">
          <button className="transition-all bg-glow-orange flex-1 max-w-xs mr-6 py-2 rounded-lg text-white font-extrabold tracking-wide mb-4 outline outline-2 outline-offset-2 outline-glotext-glow-orange hover:bg-white hover:text-glow-orange">
            Approve
          </button>
          <button className="transition-all bg-glow-orange flex-1 max-w-xs py-2 rounded-lg text-white font-extrabold tracking-wide mb-4 outline outline-2 outline-offset-2 outline-glotext-glow-orange hover:bg-white hover:text-glow-orange">
            Unstake
          </button>
        </div>
      </div>
    </div>
  );
};

export default DappCard;
