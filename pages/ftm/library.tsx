import * as React from 'react';
import Image from 'next/image';
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import Assets from '@components/ftm/Assets';
import config from 'config';

export default function Home() {
  const account = useAccount();
  const connect = useConnect({
    connector: new InjectedConnector(),
  });
  const network = useNetwork();
  const switchNetwork = useSwitchNetwork();

  const [accountData, setAccountData] = React.useState<{
    connected: boolean;
    address: string;
  }>({ connected: false, address: '' });
  const [currentChainId, setCurrentChainId] = React.useState<number>();

  React.useEffect(() => {
    setAccountData({
      connected: account.isConnected,
      address: account.address || '',
    });
  }, [account.isConnected, account.address]);

  React.useEffect(() => {
    setCurrentChainId(network.chain?.id);
  }, [network.chain?.id]);

  return (
    <div>
      <div className="fixed top-0 right-0 z-10 w-full py-6 px-2 bg-[#13b5ec] border-b-[0.25rem] border-black">
        <span className="text-2xl text-left sm:text-center block font-extrabold text-white font-spacegrotesk">
          My NFTs
        </span>
        <button
          className="absolute bg-white px-4 py-2 rounded-full text-[#13b5ec] top-6 right-2 font-bold flex flex-row items-center justify-center"
          onClick={(event) => {
            event.preventDefault();
            if (accountData.connected && currentChainId === config.ftmChainId)
              return;
            if (!accountData.connected) connect.connect();
            else if (currentChainId !== config.ftmChainId)
              switchNetwork.switchNetwork?.(config.ftmChainId);
          }}
        >
          <div className="w-6 h-6 mr-2 relative">
            <Image
              src="/images/wallet-solid.svg"
              alt="wallet"
              layout="fill"
              objectFit="scale-down"
            />
          </div>
          <span>
            {accountData.connected
              ? currentChainId === config.ftmChainId
                ? `${accountData.address.substr(
                    0,
                    5
                  )}...${accountData.address.substr(-5)}`
                : 'Switch Network'
              : `Connect`}
          </span>
        </button>
      </div>
      <Assets />
    </div>
  );
}
