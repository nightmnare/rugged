import { Chain } from 'wagmi';

export type ConfigType = {
  ftmChainId: number;
  ftmNFTAddress: string;
  ftmChain: Chain;
  ethChainId: number;
  ethNFTAddress: string;
};
const config: ConfigType = {
  ftmChainId: 250,
  ftmNFTAddress: '0xb4b564D13AC7cDE29D4631AB7E3c44689320BF03',
  ethChainId: 1,
  ethNFTAddress: '0xe8BA271e06C12bE63dACE653D29E440E3F5944f1',
  ftmChain: {
    id: 250,
    name: 'Fantom',
    network: 'fantom',
    nativeCurrency: {
      decimals: 18,
      name: 'Fantom',
      symbol: 'FTM',
    },
    rpcUrls: {
      default: 'https://rpc.ftm.tools',
    },
    blockExplorers: {
      default: { name: 'FTMScan', url: 'https://ftmscan.com' },
    },
    testnet: false,
  },
};

export default config;
