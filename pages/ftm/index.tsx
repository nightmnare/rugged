import * as React from 'react';
import { useAccount, useConnect, useEnsName } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import Image from 'next/image';

import MintButton from '@components/ftm/MintButton';
import LibraryButton from '@components/ftm/LibraryButton';

export default function Home() {
  React.useEffect(() => {
    //@ts-ignore
    window.$('.background-content').blockrain({
      theme: {
        background: '#ececec',
        backgroundGrid: null,
        primary: null,
        secondary: null,
        stroke: null,
        innerStroke: null,
        blocks: {
          line: '#8dff8b',
          square: '#ff6767',
          arrow: '#61dfff',
          rightHook: '#ff6767',
          leftHook: '#c8c8c8',
          rightZag: '#ffe858',
          leftZag: '#ffffff',
        },
      },
      blockWidth: 15,
      speed: 30,
      autoplay: true,
      autoplayRestart: true,
    });
  }, []);
  return (
    <div id="mint" className="w-full h-full overflow-hidden">
      <div className="w-full h-screen relative">
        <div className="background-content absolute w-full h-full top-0 left-0"></div>
        <div className="w-full h-full absolute top-0 border-b-4 border-l-4 border-r-4 b-4 border-black flex items-start justify-center">
          <div className="flex flex-col justify-center items-center gap-y-5 p-5 h-full">
            <div className="w-40 h-40 lg:w-64 lg:h-72 relative">
              <div className="absolute top-0 -right-24 w-20 h-24 lg:w-28 lg:h-32 lg:-right-40">
                <Image src="/images/random.png" alt="random" layout="fill" />
              </div>
              <Image src="/images/gift-box.png" alt="gift" layout="fill" />
            </div>
            <MintButton />
            <LibraryButton />
          </div>
        </div>
      </div>
    </div>
  );
}
