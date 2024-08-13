'use client';

import React from 'react';

import { useWalletProviderContext } from './WalletProvider';

function Header() {
  const {wallet, switchNetwork, connectWallet, chainId, mantleNetwork} = useWalletProviderContext()

  return (
    <div className="bg-[#0D0D0D] max-w-[1512px] h-[59px] gap-0 border-b border-black/0 ">
      <h2 className="absolute top-[19px] left-[20px] font-Geist text-[16px] font-medium leading-[19.84px] text-center text-primary">
        Diffusion Labs
      </h2>
      <p className="absolute top-[19px] left-[149px] text-secondary font-Geist text-[16px] font-medium leading-[19.84px] text-left">
        Frontend Interview Assessment
      </p>
      <div className="fixed w-[123px] h-[35px] top-[12px] right-[15px] gap-[6.16px] flex items-center justify-center rounded-[8px] bg-[#FF700933] bg-[20%] shadow-[0px_0.77px_1.54px_0px_#0000000D] text-[#FF7009]">
          <button className="font-Geist text-[14px] flex items-center font-medium leading-[15.41px]" onClick={!wallet ? () => connectWallet() : chainId !== mantleNetwork?.chainId ? () => switchNetwork() : () => ''}>
           {!wallet ? 'Connect Wallet' : chainId !== mantleNetwork?.chainId ? 'Switch Network' :  `${wallet.slice(0, 6)}..${wallet.slice(wallet.length - 2)}`}
          </button>
      </div>
    </div>
  );
}

export default Header;