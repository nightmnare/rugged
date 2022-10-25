import * as React from 'react';
import Image from 'next/image';

const Grid: React.FC = () => {
  return (
    <>
      <div className="w-full min-h-[13rem] bg-white flex justify-center items-center font-modius text-2xl text-center">
        we are all clowns of our own circus <br /> we smile and do weird stuff
        to make others feel happy <br /> but deep inside we all are acting 🤡
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 border-b-4 border-t-4 border-black relative w-full">
        <div className="w-full font-spacegrotesk text-lg grid grid-cols-1">
          <div className="border-r-[0.25rem] border-black">
            <div className="w-[14rem] h-72 p-8 mx-auto">
              <div className="w-full h-full relative">
                <Image
                  src="/images/FTM_coin.png"
                  layout="fill"
                  alt="FTM"
                  objectFit="scale-down"
                />
              </div>
            </div>
            <div className="text-2xl mx-auto text-center font-modius">
              55 PUMPKIN
            </div>
            <div className="text-xl mx-auto text-center ">MINT IS LIVE</div>
          </div>
          <div className="lg:border-r-[0.25rem] border-black p-16">
            <div className="w-10 h-14 relative">
              <Image src="/images/b1.png" layout="fill" alt="" />
            </div>
            <div className="text-2xl mt-3 font-spacegrotesk font-bold">
              Rewards
            </div>
            <div className="text-md mt-3">
              NFT holders automatically gain access to super high APY staking
              pools , pools rewards are generated through an auto trading bot
              that automatically invests and generates rewards for you
            </div>
          </div>
          <div className="lg:border-r-[0.25rem] border-black p-16">
            <div className="w-10 h-14 relative">
              <Image src="/images/b1.png" layout="fill" alt="" />
            </div>
            <div className="text-2xl mt-3 font-spacegrotesk font-bold">
              Utility
            </div>
            <div className="text-md mt-3">
              ETH rugged clowns holders can also apply for a clowns license to
              enjoy weekly discord giveways and challenges exclusive to licensed
              clowns
            </div>
          </div>
          <div className="lg:border-r-[0.25rem] border-black p-16">
            <div className="w-10 h-14 relative">
              <Image src="/images/b1.png" layout="fill" alt="" />
            </div>
            <div className="text-2xl mt-3 font-spacegrotesk font-bold">
              Community
            </div>
            <div className="text-md mt-3">
              The Rugged Clowns NFTs are a part of the Pumpkins ecosystem with a
              vision of one token used among many protocols. <br /> The Pumpkins
              ecosystem has already built a strong community and the team has
              been KYCed. <br /> Rugged Clowns will undoubtedly have no limits
              and more utility will be added as our ecosystem grows.
            </div>
          </div>

          <div className="lg:border-r-[0.25rem] border-black p-16">
            <div className="w-10 h-14 relative">
              <Image src="/images/b1.png" layout="fill" alt="" />
            </div>
            <div className="text-2xl mt-3 font-spacegrotesk font-bold">
              Clowns Licence
            </div>
            <div className="text-md mt-3">
              Every Rugged Clowns holder is eligible for a clown license. <br />{' '}
              To be eligible, you must have your Rugged Clowns NFT as your
              profile picture on Discord and/or Twitter. <br /> To apply for a
              license, click on the &apos;claim license&apos; button and you
              will be asked to provide your Twitter and/or Discord username and
              your wallet address to validate ownership.
            </div>
          </div>

          {/* <img
            className="w-20 lg:w-28 absolute lg:left-0 -top-12 lg:right-20"
            src="/confetti/flower.png"
          />
          <img
            className="w-16 lg:w-24 absolute -right-0 bottom-0 lg:bottom-0 lg:right-20"
            src="/confetti/kite-pops.png"
          /> */}
        </div>
        <div className="w-full font-spacegrotesk text-lg flex flex-col">
          <div className="">
            <div className="w-72 h-72 relative p-8 mx-auto">
              <Image
                src="/images/coins/ETH_coin.svg"
                layout="fill"
                alt="ETH"
                objectFit="scale-down"
              />
            </div>
            <div className="text-2xl mx-auto text-center font-modius">
              FREE MINT
            </div>
            <div className="text-xl mx-auto text-center">
              15<sup>th</sup> Of October 2022
            </div>
          </div>
          <div className="p-16">
            <div className="w-10 h-14 relative">
              <Image src="/images/b1.png" layout="fill" alt="" />
            </div>
            <div className="text-2xl mt-3 font-spacegrotesk font-bold">
              Rewards
            </div>
            <div className="text-md mt-3">
              NFT holders automatically gain access to super high APY staking
              pools , pools rewards are generated through an auto trading bot
              that automatically invests and generates rewards for you
            </div>
          </div>
          <div className=" p-16">
            <div className="w-10 h-14 relative">
              <Image src="/images/b1.png" layout="fill" alt="" />
            </div>
            <div className="text-2xl mt-3 font-spacegrotesk font-bold">
              Utility
            </div>
            <div className="text-md mt-3">
              ETH rugged clowns holders can also apply for a clowns license to
              enjoy weekly discord giveways and challenges exclusive to licensed
              clowns
            </div>
          </div>

          {/* <img
            className="w-20 lg:w-28 absolute lg:left-0 -top-12 lg:right-20"
            src="/confetti/flower.png"
          />
          <img
            className="w-16 lg:w-24 absolute -right-0 bottom-0 lg:bottom-0 lg:right-20"
            src="/confetti/kite-pops.png"
          /> */}
        </div>
      </div>
    </>
  );
};

export default Grid;
