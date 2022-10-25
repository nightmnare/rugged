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
import ethNFTAbi from 'abis/ethNFT.json';
import ethERC20Abi from 'abis/ethERC20.json';
import { EthNFT, IDropClaimCondition } from 'contracts/EthNFT';
import { EthERC20 } from 'contracts/EthERC20';
import { formatUnits } from '@ethersproject/units';
import * as ethers from 'ethers';

const MintButton: React.FC<{ className: string }> = ({ className }) => {
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

  const erc20Contract = useContract({
    address: claimCondition?.currency,
    signerOrProvider: account.isConnected ? signer.data : provider,
    abi: ethERC20Abi,
  });

  const [reload, setReload] = React.useState<boolean>(false);

  React.useEffect(() => {
    setConnected(account.isConnected);
  }, [account.isConnected]);

  React.useEffect(() => {
    setCurrentChainId(network.chain?.id);
  }, [network.chain?.id]);

  React.useEffect(() => {
    if (!nftContract?.signer || network.chain?.id !== config.ethChainId) return;

    const loadClaimCondition = async () => {
      try {
        const _activeCCId = await (
          nftContract as EthNFT
        ).getActiveClaimConditionId();
        const _claimCondition = await (
          nftContract as EthNFT
        ).getClaimConditionById(_activeCCId);
        setClaimCondition(_claimCondition);
      } catch {}
    };
    loadClaimCondition();

    const loadCanMint = async () => {
      try {
        const _nextMint = await (nftContract as EthNFT).nextTokenIdToMint();
        const _nextClaim = await (nftContract as EthNFT).nextTokenIdToClaim();
        if (_nextClaim.lt(_nextMint)) setCanMint(true);
        else setCanMint(false);
      } catch {
        setCanMint(false);
      }
    };
    loadCanMint();
  }, [nftContract, network.chain?.id, reload]);

  React.useEffect(() => {
    if (!nftContract?.signer || network.chain?.id !== config.ethChainId) return;

    const loadClaimCondition = async () => {
      try {
        const _activeCCId = await (
          nftContract as EthNFT
        ).getActiveClaimConditionId();
        const _claimCondition = await (
          nftContract as EthNFT
        ).getClaimConditionById(_activeCCId);
        setClaimCondition(_claimCondition);
      } catch {
        setClaimCondition(undefined);
      }
    };
    loadClaimCondition();

    const loadCanMint = async () => {
      try {
        const _nextMint = await (nftContract as EthNFT).nextTokenIdToMint();
        const _nextClaim = await (nftContract as EthNFT).nextTokenIdToClaim();
        if (_nextClaim.lt(_nextMint)) setCanMint(true);
        else setCanMint(false);
        console.log(_nextClaim.toString());
        console.log(_nextMint.toString());
      } catch {
        setCanMint(false);
      }
    };
    loadCanMint();
  }, [nftContract, network.chain?.id, reload]);

  React.useEffect(() => {
    if (
      !erc20Contract?.signer ||
      network.chain?.id !== config.ethChainId ||
      !erc20Contract.address ||
      !claimCondition
    )
      return;

    const loadApprove = async () => {
      try {
        const owner = await erc20Contract.signer.getAddress();
        const _allowance = await (erc20Contract as EthERC20).allowance(
          owner,
          config.ethNFTAddress
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
      if (network.chain?.id !== config.ethChainId) return;
      if (haveToApprove) {
        if (!erc20Contract?.signer) return;
        setLoading(true);
        try {
          const tx = await (erc20Contract as EthERC20).approve(
            config.ethNFTAddress,
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
          const _balance = await (erc20Contract as EthERC20).balanceOf(
            _address
          );
          if (claimCondition.pricePerToken.gt(_balance))
            toast.error('You don’t have any Pumpkins to spend.');
          else {
            const tx = await (nftContract as EthNFT).claim(
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

  return connected ? (
    currentChainId === config.ethChainId ? (
      <button
        className={className}
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
          <span className="flex items-center justify-center">
            Mint ({formatUnits(claimCondition.pricePerToken)}
            <div className="w-[20px] h-[20px] ml-[3px] mb-[6px] relative">
              <Image src="/images/pumpkin.png" alt="KINS" layout="fill" />
            </div>
            )
          </span>
        ) : (
          'No nfts are available now.'
        )}
      </button>
    ) : (
      <button
        className={className}
        onClick={(event) => {
          event.preventDefault();
          switchNetwork.switchNetwork?.(config.ethChainId);
        }}
      >
        Switch Network
      </button>
    )
  ) : (
    <button
      className={className}
      onClick={(event) => {
        event.preventDefault();
        connect.connect();
      }}
    >
      Connect Wallet
    </button>
  );
};

export default MintButton;
