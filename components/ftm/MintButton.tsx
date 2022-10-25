import * as React from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
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

import config from 'config';
import ftmNFTAbi from 'abis/ftmNFT.json';
import ftmERC20Abi from 'abis/ftmERC20.json';
import { FtmNFT, IDropClaimCondition } from 'contracts/FtmNFT';
import { FtmERC20 } from 'contracts/FtmERC20';
import { formatUnits } from '@ethersproject/units';
import * as ethers from 'ethers';

const MintButton: React.FC = () => {
  const account = useAccount();
  const connect = useConnect({
    connector: new InjectedConnector(),
  });
  const signer = useSigner();
  const provider = useProvider({ chainId: config.ftmChainId });
  const network = useNetwork();
  const switchNetwork = useSwitchNetwork();
  const nftContract = useContract({
    address: config.ftmNFTAddress,
    signerOrProvider: account.isConnected ? signer.data : provider,
    abi: ftmNFTAbi,
  });

  const [connected, setConnected] = React.useState<boolean>(false);
  const [currentChainId, setCurrentChainId] = React.useState<number>();
  const [canMint, setCanMint] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [haveToApprove, setHaveToApprove] = React.useState<boolean>(true);
  const [claimCondition, setClaimCondition] =
    React.useState<IDropClaimCondition.ClaimConditionStructOutput>();

  const [reload, setReload] = React.useState<boolean>(false);

  const erc20Contract = useContract({
    address: claimCondition?.currency,
    signerOrProvider: account.isConnected ? signer.data : provider,
    abi: ftmERC20Abi,
  });

  React.useEffect(() => {
    setConnected(account.isConnected);
  }, [account.isConnected]);

  React.useEffect(() => {
    setCurrentChainId(network.chain?.id);
  }, [network.chain?.id]);

  React.useEffect(() => {
    if (!nftContract?.signer || network.chain?.id !== config.ftmChainId) return;

    const loadClaimCondition = async () => {
      try {
        const _activeCCId = await (
          nftContract as FtmNFT
        ).getActiveClaimConditionId();
        const _claimCondition = await (
          nftContract as FtmNFT
        ).getClaimConditionById(_activeCCId);
        setClaimCondition(_claimCondition);
      } catch {}
    };
    loadClaimCondition();

    const loadCanMint = async () => {
      try {
        const _nextMint = await (nftContract as FtmNFT).nextTokenIdToMint();
        const _nextClaim = await (nftContract as FtmNFT).nextTokenIdToClaim();
        if (_nextClaim.lt(_nextMint)) setCanMint(true);
        else setCanMint(false);
      } catch {
        setCanMint(false);
      }
    };
    loadCanMint();
  }, [nftContract, network.chain?.id, reload]);

  React.useEffect(() => {
    if (!nftContract?.signer || network.chain?.id !== config.ftmChainId) return;

    const loadClaimCondition = async () => {
      try {
        const _activeCCId = await (
          nftContract as FtmNFT
        ).getActiveClaimConditionId();
        const _claimCondition = await (
          nftContract as FtmNFT
        ).getClaimConditionById(_activeCCId);
        setClaimCondition(_claimCondition);
      } catch {
        setClaimCondition(undefined);
      }
    };
    loadClaimCondition();

    const loadCanMint = async () => {
      try {
        const _nextMint = await (nftContract as FtmNFT).nextTokenIdToMint();
        const _nextClaim = await (nftContract as FtmNFT).nextTokenIdToClaim();
        if (_nextClaim.lt(_nextMint)) setCanMint(true);
        else setCanMint(false);
      } catch {
        setCanMint(false);
      }
    };
    loadCanMint();
  }, [nftContract, network.chain?.id, reload]);

  React.useEffect(() => {
    if (
      !erc20Contract?.signer ||
      network.chain?.id !== config.ftmChainId ||
      !erc20Contract.address ||
      !claimCondition
    )
      return;

    const loadApprove = async () => {
      try {
        const owner = await erc20Contract.signer.getAddress();
        const _allowance = await (erc20Contract as FtmERC20).allowance(
          owner,
          config.ftmNFTAddress
        );
        if (claimCondition.pricePerToken.gt(_allowance)) setHaveToApprove(true);
        else setHaveToApprove(false);
      } catch {
        setHaveToApprove(false);
      }
    };
    loadApprove();
  }, [erc20Contract, network.chain?.id, claimCondition, reload]);

  const handleMint = React.useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      toast.dismiss();
      if (network.chain?.id !== config.ftmChainId) return;
      if (haveToApprove) {
        if (!erc20Contract?.signer) return;
        setLoading(true);
        try {
          const tx = await (erc20Contract as FtmERC20).approve(
            config.ftmNFTAddress,
            ethers.BigNumber.from(2).pow(256).sub(1)
          );
          await tx.wait(1);
          setHaveToApprove(false);
        } catch {
          toast.error('Error Occured while Approving.');
        } finally {
          setLoading(false);
        }
      } else {
        if (!nftContract?.signer || !claimCondition) return;
        setLoading(true);
        try {
          const _address = await nftContract.signer.getAddress();
          const _balance = await (erc20Contract as FtmERC20).balanceOf(
            _address
          );
          if (claimCondition.pricePerToken.gt(_balance))
            toast.error('You don’t have any Pumpkins to spend.');
          else {
            const tx = await (nftContract as FtmNFT).claim(
              _address,
              1,
              claimCondition.currency,
              claimCondition.pricePerToken,
              [],
              0
            );
            await tx.wait(1);
            toast.info('Succesfully Minted.');
            setReload((_reload) => !_reload);
          }
        } catch {
          toast.error('Error Occured while Minting.');
        } finally {
          setLoading(false);
        }
      }
    },
    [
      haveToApprove,
      erc20Contract,
      nftContract,
      network.chain?.id,
      claimCondition,
    ]
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        {connected ? (
          currentChainId === config.ftmChainId ? (
            <div className="flex flex-col">
              <button
                className="py-2 px-8 text-sm lg:text-md lg:py-4 lg:px-20 border-[1.5px]  border-black bg-white rounded text-black disabled:text-gray-400 disabled:cursor-not-allowed shadow-[4px_4px_0_0_rgb(0,0,0)] agrandir flex items-center font-agrandir"
                onClick={handleMint}
                disabled={!canMint || !claimCondition || loading}
              >
                {haveToApprove ? (
                  loading ? (
                    'Apprving Now...'
                  ) : (
                    'Approve'
                  )
                ) : loading ? (
                  'Minting Now...'
                ) : canMint && claimCondition ? (
                  <>
                    Mint ({formatUnits(claimCondition.pricePerToken)}
                    <div className="w-[20px] h-[20px] ml-[3px] mb-[6px] relative">
                      <Image
                        src="/images/pumpkin.png"
                        alt="KINS"
                        layout="fill"
                      />
                    </div>
                    )
                  </>
                ) : (
                  'No nfts are available now.'
                )}
              </button>
            </div>
          ) : (
            <button
              className="py-2 px-8 text-sm lg:text-md lg:py-4 lg:px-20 border-[1.5px] text-black border-black rounded bg-white shadow-[4px_4px_0_0_rgb(0,0,0)] font-agrandir"
              onClick={(event) => {
                event.preventDefault();
                switchNetwork.switchNetwork?.(config.ftmChainId);
              }}
            >
              Switch Network
            </button>
          )
        ) : (
          <button
            className="py-2 px-8 text-sm lg:text-md lg:py-4 lg:px-20 border-[1.5px] text-black border-black rounded bg-white shadow-[4px_4px_0_0_rgb(0,0,0)] font-agrandir"
            onClick={(event) => {
              event.preventDefault();
              connect.connect();
            }}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default MintButton;
