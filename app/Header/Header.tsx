'use client';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { getWeb3, setUpWeb3 } from '../web3';
import { abi, contractAddress } from '../components/stakingReward';

function Header() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | undefined>(
    undefined
  );

  useEffect(() => {
    async function initialize() {
      try {
        await setUpWeb3();
        const web3Instance = getWeb3();
        console.log(web3Instance);

        const signer = await web3Instance.getSigner();
        console.log(signer);

        const contractInstance = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );
        setContract(contractInstance);

        const wallet = await signer.getAddress();
        setWalletAddress(wallet);
      } catch (error) {
        console.log('Error initializing: ', error);
        setWalletAddress(null);
      }
    }
    initialize();
  }, []);

  return (
    <div className="bg-[#0D0D0D] max-w-[1512px] h-[59px] gap-0 border-b border-black/0 ">
      <h2 className="absolute top-[19px] left-[20px] font-Geist text-[16px] font-medium leading-[19.84px] text-center text-primary">
        Diffusion Labs
      </h2>
      <p className="absolute top-[19px] left-[149px] text-secondary font-Geist text-[16px] font-medium leading-[19.84px] text-left">
        Frontend Interview Assessment
      </p>
      <div className="fixed w-[123px] h-[35px] top-[12px] right-[15px] gap-[6.16px] flex items-center justify-center rounded-[8px] bg-[#FF700933] bg-[20%] shadow-[0px_0.77px_1.54px_0px_#0000000D] text-[#FF7009]">
        {walletAddress ? (
          <p className="w-[79px] h-[19px] font-Geist text-[14px] flex items-center font-medium leading-[15.41px]">
            {walletAddress.slice(0, 6)}..
            {walletAddress.slice(walletAddress.length - 2)}
          </p>
        ) : (
          <p className="text-white">No wallet connected</p>
        )}
      </div>
    </div>
  );
}

export default Header;
