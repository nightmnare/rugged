import * as React from 'react';
import 'antd/dist/antd.css';
import { Tooltip } from 'antd';
import {
  useAccount,
  useConnect,
  useContract,
  useNetwork,
  useProvider,
  useSigner,
  useSwitchNetwork,
} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Image from 'next/image';

import ethNFTAbi from 'abis/ethNFT.json';
import Header from '@components/eth/Header';
import mintImg from 'public/images/mint.gif';
import { useRouter } from 'next/router';
import config from 'config';
import { IDropClaimCondition } from 'contracts/EthNFT';
import MintButton from '@components/eth/MintButton';

const Home: React.FC = () => {
  const navigate = useRouter();
  const account = useAccount();
  const connect = useConnect({
    connector: new InjectedConnector(),
  });
  const signer = useSigner();
  const provider = useProvider({ chainId: config.ethChainId });
  const network = useNetwork();
  const switchNetwork = useSwitchNetwork();
  const nftContract = useContract({
    address: config.ethNFTAddress,
    signerOrProvider: account.isConnected ? signer.data : provider,
    abi: ethNFTAbi,
  });

  const [connected, setConnected] = React.useState<boolean>(false);
  const [currentChainId, setCurrentChainId] = React.useState<number>();
  const [canMint, setCanMint] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [haveToApprove, setHaveToApprove] = React.useState<boolean>(true);
  const [claimCondition, setClaimCondition] =
    React.useState<IDropClaimCondition.ClaimConditionStructOutput>();

  React.useEffect(() => {
    setConnected(account.isConnected);
  }, [account.isConnected]);

  React.useEffect(() => {
    setCurrentChainId(network.chain?.id);
  }, [network.chain?.id]);

  return (
    <div className="flex flex-col items-center justify-center pb-10 bg-light-cream w-full h-screen px-6 relative">
      <Header
        isBackButton={true}
        title="Free Mint"
        isVerify={false}
        wallet={true}
      />
      <div className="w-full max-w-xs rounded-3xl outline outline-8 outline-glow-orange outline-offset-8 mb-12 overflow-hidden leading-none">
        <Image src={mintImg} alt="mint"></Image>
      </div>
      <Tooltip
        title="For Claimed NFT Click On Below Button"
        color={'#ed995b'}
        placement="left"
      >
        <span className="transition-all w-full max-w-sm m-1 text-glow-orange text-xl font-extrabold">
          Claimed NFT 0 / 3000
        </span>
      </Tooltip>
      <MintButton className="transition-all w-full max-w-sm m-1 sm:m-2 hover:bg-white hover:text-pink bg-glow-orange text-white py-2 rounded-md font-extrabold text-xs sm:text-lg hover:outline hover:outline-4 hover:outline-glow-orange outline-offset-1 sm:outline-offset-4 cursor-pointer disabled:cursor-not-allowed" />
      <button
        className="transition-all w-full max-w-sm m-1 sm:m-2 hover:bg-white hover:text-pink bg-glow-orange text-white py-2 rounded-md font-extrabold text-xs sm:text-lg hover:outline hover:outline-4 hover:outline-glow-orange outline-offset-1 sm:outline-offset-4 cursor-pointer disabled:cursor-not-allowed"
        onClick={(_) => navigate.push('./library')}
      >
        Your Own NFT
      </button>
      <div className="flex-1"></div>
    </div>
  );
};

export default Home;
