import React from 'react';
import Image from 'next/dist/client/image';

const Description = () => {
  return (
    <div className="w-full relative h-max mt-16 grid grid-cols-1 lg:grid-cols-2 lg:divide-x-[0.25rem] divide-black lg:border-b-[0.25rem] border-black font-spacegrotesk">
      <div className="bg-[#d3efef] lg:flex items-center justify-center p-8 lg:p-20 lg:pt-16 border-black border-b-4 lg:border-0">
        <div className="w-full h-full">
          <div className="font-agrandir text-7xl leading-[5rem]">
            Rugged <br /> Clowns
          </div>
          <div className="mt-3 text-lg max-w-lg font-spacegrotesk">
            Rugged Clowns is a collection of 5,000 unique clown themed NFTs with
            rugged themed utilities and vengeance themed rewards. <br /> The
            idea of clowns came from the increasing amount of rugs happening in
            Defi and the fake dreams and roadmaps promised by project developers
            which never exist. <br /> Being a clown is something we all can
            relate to since we have all been rugged politely, slowly or even
            verbally. <br /> By having our own community we hope that we can
            make something out of that feeling and potentially stop or slow down
            scammers through our Social Dapp or through our virtual events.
          </div>
        </div>
      </div>

      <div className="bg-[#a7cbf2] relative flex items-center justify-center border-b-[0.25rem] border-black lg:border-b-0">
        <div
          style={{
            transition:
              'transform 300ms ease, box-shadow 300ms ease, -webkit-transform 300ms ease',
          }}
          className="relative w-80 h-80 my-8 lg:my-0 lg:h-[26rem] lg:w-[26rem] bg-white rounded-md border-[3px] shadow-[4px_4px_0_0_rgb(0,0,0)] border-black overflow-hidden"
        >
          <Image src="/images/smile-red.png" alt="" layout="fill" />
        </div>
      </div>
    </div>
  );
};

export default Description;
