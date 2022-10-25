import * as React from "react";
import { useRouter } from "next/router";

import Image from "next/image";

import { useAccount, useConnect, useNetwork, useSwitchNetwork } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import config from "config";

export type HeaderProps = {
  title?: string;
  isBackButton?: boolean;
  isVerify?: boolean;
  wallet?: boolean;
};

const Header: React.FC<HeaderProps> = (props) => {
  const router = useRouter();
  const account = useAccount();
  const connect = useConnect({
    connector: new InjectedConnector(),
  });
  const network = useNetwork();
  const switchNetwork = useSwitchNetwork();

  const [accountData, setAccountData] = React.useState<{
    connected: boolean;
    address: string;
  }>({ connected: false, address: "" });
  const [currentChainId, setCurrentChainId] = React.useState<number>();

  React.useEffect(() => {
    setAccountData({
      connected: account.isConnected,
      address: account.address || "",
    });
  }, [account.isConnected, account.address]);

  React.useEffect(() => {
    setCurrentChainId(network.chain?.id);
  }, [network.chain?.id]);
  return (
    <div className="flex flex-row items-center px-2 md:px-10 w-full h-32">
      {props.isBackButton && (
        <button onClick={() => router.back()} className="bg-opacity-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            width="48"
            className="transition-all fill-glow-orange rounded-full outline outline-4 outline-offset-2 outline-glow-orange hover:bg-white hover:outline-white"
          >
            <path d="M24 40 8 24 24 8l2.1 2.1-12.4 12.4H40v3H13.7l12.4 12.4Z" />
          </svg>
        </button>
      )}
      {props.isVerify && (
        <button
          className="transition-all flex flex-row items-center justify-center space-x-2 bg-glow-orange rounded-full p-2 pr-4 overflow-hidden hover:bg-white hover:text-glow-orange text-white py-2 font-extrabold text-xs sm:text-lg"
          onClick={() => {
            router.push(
              "https://gateway.ipfscdn.io/ipfs/QmNgNaLwzgMxcx9r6qDvJmTFam6xxUxX7Vp8E99oRt7i74/"
            );
          }}
        >
          <div className="w-10 h-10 relative">
            <Image
              src="/images/SF.jpg"
              alt="SF"
              layout="fill"
              objectFit="scale-down"
              className="rounded-full"
            />
          </div>
          <span className="font-semibold text-base">Audited By</span>
        </button>
      )}

      <span className="flex-1 text-center text-glow-orange text-4xl font-extrabold font-agrandir sm:ml-16">
        {props.title}
      </span>
      {props.wallet && (
        <button
          className="bg-white px-4 py-2 rounded-full text-[#13b5ec] top-6 right-2 font-bold flex flex-row items-center justify-center"
          onClick={(event) => {
            event.preventDefault();
            if (accountData.connected && currentChainId === config.ethChainId)
              return;
            if (!accountData.connected) connect.connect();
            else if (currentChainId !== config.ethChainId)
              switchNetwork.switchNetwork?.(config.ethChainId);
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
              ? currentChainId === config.ethChainId
                ? `${accountData.address.substr(
                    0,
                    5
                  )}...${accountData.address.substr(-5)}`
                : "Switch Network"
              : `Connect`}
          </span>
        </button>
      )}
    </div>
  );
};

export default Header;
