"use client";

import React from 'react';
import { useWalletProviderContext } from './WalletProvider';

function Header() {
  const { wallet, switchNetwork, connectWallet, chainId, mantleNetwork } = useWalletProviderContext();

  const handleWalletConnection = async () => {
    try {
      if (!wallet) {
        await connectWallet();
      } else if (chainId !== mantleNetwork?.chainId) {
        await switchNetwork();
      }
    } catch (error) {
      console.error("Error connecting wallet or switching network:", error);
    }
  };

  return (
    <div className="bg-[#0D0D0D] flex justify-between items-center px-8  max-w-[1512px] h-[59px] gap-0 border-b border-black/0">
      <div className='flex flex-row gap-4'>
        <h2 className="font-Geist text-[16px] font-medium leading-[19.84px] text-center text-primary">
        Claim Rewards
      </h2>
      <p className="text-secondary font-Geist text-[16px] font-medium leading-[19.84px] text-left md:block hidden">
        decentralized application for a dummy token
      </p>
      </div>
      <div className="py-2 px-3 gap-[6.16px] flex items-center justify-center rounded-[8px] bg-[#FF700933] bg-[20%] shadow-[0px_0.77px_1.54px_0px_#0000000D] text-[#FF7009]">
        <button
          className="font-Geist text-[14px] flex items-center font-medium leading-[15.41px]"
          onClick={handleWalletConnection}
        >
          {!wallet
            ? 'Connect Wallet'
            : chainId !== mantleNetwork?.chainId
            ? 'Switch Network'
            : `${wallet.slice(0, 6)}..${wallet.slice(wallet.length - 2)}`}
        </button>
      </div>
    </div>
  );
}

export default Header;