import * as React from 'react';
import Image, { ImageLoaderProps } from 'next/image';

export type OwnNFTCardProps = {
  title: string;
  nft: string;
  avatar: string;
};

const imgLoader = ({ src }: ImageLoaderProps) => {
  return `https://gateway.ipfscdn.io/ipfs/${src}`;
};

const OwnNftCard: React.FC<OwnNFTCardProps> = (props) => {
  return (
    <div className="p-2">
      <div className="w-full bg-white overflow-hidden rounded-xl relative">
        <div className="w-64 h-64 m-auto relative">
          <Image
            loader={imgLoader}
            src={props.nft}
            alt={props.title}
            layout="fill"
            objectFit="scale-down"
          />
        </div>

        <div className="flex flex-row items-center space-x-4  w-full bg-glow-orange py-2 px-2">
          <div className="h-20 w-20 rounded-full overflow-hidden relative">
            <Image
              loader={imgLoader}
              src={props.avatar}
              alt={props.title}
              layout="fill"
              objectFit="scale-down"
            />
          </div>
          <span className="text-white text-2xl font-extrabold">
            {props.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OwnNftCard;
