import React from 'react';
import axios from 'axios';
import Image, { ImageLoaderProps } from 'next/image';
import {
  useAccount,
  useContract,
  useNetwork,
  useProvider,
  useSigner,
} from 'wagmi';

import config from 'config';
import ftmNFTAbi from 'abis/ftmNFT.json';
import { FtmNFT } from 'contracts/FtmNFT';
import * as ethers from 'ethers';

const imgLoader = ({ src }: ImageLoaderProps) => {
  return `https://gateway.ipfscdn.io/ipfs/${src}`;
};

export default function Carousel() {
  const [nfts, setNfts] = React.useState<Array<{ img: string; name: string }>>(
    []
  );
  const [totalCount, setTotalCount] = React.useState<number>(0);

  const account = useAccount();
  const signer = useSigner();
  const provider = useProvider({ chainId: config.ftmChainId });
  const network = useNetwork();
  const nftContract = useContract({
    address: config.ftmNFTAddress,
    signerOrProvider: account.isConnected ? signer.data : provider,
    abi: ftmNFTAbi,
  });
  const [connected, setConnected] = React.useState<boolean>(false);

  React.useEffect(() => {
    setConnected(account.isConnected);
  }, [account.isConnected]);

  React.useEffect(() => {
    if (!nftContract?.signer || network.chain?.id !== config.ftmChainId) {
      setNfts([]);
      return;
    }
    const getAllMetadata = async (_totalCount: ethers.BigNumber) => {
      const _nfts: Array<{ img: string; name: string }> = [];
      for (
        var index = ethers.BigNumber.from(0);
        index.lt(_totalCount);
        index = index.add(1)
      ) {
        const _tokenId = await (nftContract as FtmNFT).tokenOfOwnerByIndex(
          nftContract.signer.getAddress(),
          index
        );
        const _tokenURI = await (nftContract as FtmNFT).tokenURI(_tokenId);
        const metadata = (
          await axios.get<{ image?: string; name: string }>(
            `https://gateway.ipfscdn.io/${_tokenURI.replace(
              'ipfs://',
              'ipfs/'
            )}`
          )
        ).data;
        _nfts.push({
          img: metadata.image?.replace('ipfs://', '') || '',
          name: metadata.name,
        });
      }
      setNfts(_nfts);
    };
    (nftContract as FtmNFT)
      .balanceOf(nftContract.signer.getAddress())
      .then((_totalCount) => getAllMetadata(_totalCount))
      .catch(() => {
        setTotalCount(0);
      });
  }, [nftContract, network.chain?.id]);

  return connected ? (
    <>
      {nfts.length > 0 ? (
        <div className="w-full pt-24 h-screen border-b-[0.25rem] border-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 relative overflow-y-auto overflow-x-hidden card">
          {nfts.map((nft, index) => (
            <a
              key={index}
              href={`https://gateway.ipfscdn.io/ipfs/${nft.img}`}
              target="_blank"
              rel="noreferrer"
              className="transition my-auto mx-auto relative bg-red-50 hover:-translate-x-[3px] hover:-translate-y-[3px] cursor-pointer border-[0.25rem] border-black w-[90vw] h-[90vw] sm:w-[45vw] sm:h-[45vw] md:w-[31vw] md:h-[31vw] lg:w-[23vw] lg:h-[23vw] xl:w-[18vw] xl:h-[18vw] 2xl:w-[16vw] 2xl:h-[16vw] flex flex-col items-center justify-center overflow-hidden p-2 rounded-2xl"
            >
              {nft && (
                <Image
                  loader={imgLoader}
                  src={nft.img}
                  alt="Picture of the author"
                  layout="fill"
                />
              )}
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-[20px] pt-24 color-[#1a2b4c] font-spacegrotesk">
          {totalCount > 0 ? 'Loading...' : 'You have no nfts yet'}
        </p>
      )}
    </>
  ) : null;
}
