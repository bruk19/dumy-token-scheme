import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "@/config";
import { useWalletProviderContext } from "./WalletProvider";

interface Props {
  amount: string;
  inputCallback?: () => void;
  callback?: () => void
  isClaim?: boolean,
  isSchemaStarted?: boolean
}
const SchemeButton: React.FC<Props> = ({ amount, callback, inputCallback, isClaim, isSchemaStarted }) => {
  const {
    contractInstance: contract,
    wallet,
    connectWallet,
    usdtContractInstance,
  } = useWalletProviderContext();

  const [schemeState, setSchemeState] = useState("not_started");

  const stake = async () => {
    if (!contract || !usdtContractInstance) return;

    try {
      const decimals = await usdtContractInstance?.decimals();
      const amountBN = ethers.parseUnits(amount, decimals);

      const _tx = await usdtContractInstance?.approve(
        contractAddress,
        amountBN
      );
      await _tx.wait();

      const tx = await contract.stake(amountBN);
      const receipt = await tx.wait();
      if(inputCallback) inputCallback()
      console.log("Deposited succesfully. Transaction receipt:", receipt);
    } catch (error) {
      console.log("Error on deposite:", error);
    }
  };

  const claim = async () => {
      if(!contract) return  
      try {
        const tx = await contract.withdrawAndClaimAllRewards();
        const receipt = await tx.wait();
        console.log("Claimed succesfully. Transaction receipt:", receipt);
        if(callback) callback()
        
      } catch (error) {
        console.log("Error on claiming:", error);
      }
    
  };

  useEffect(() => {
    if (isClaim) {
      setSchemeState("claim_token");
    }
  }, [isClaim]);

  useEffect(() => {
    if (isSchemaStarted) {
      setSchemeState("deposit_token");
    }
  }, [isSchemaStarted]);

  return (
    <div>
      {schemeState === "not_started" && (
        <button
        className="bg-[#FF70091A] w-full bg-[20%] rounded-[8px] text-[#FF7009] font-Geist text-[16px] py-[16px] leading-[19.84px] mt-[35px]"
        >
          SCHEME HAS NOT STARTED
        </button>
      )}
      {schemeState === "deposit_token" && !wallet  && (
        <button
        className="bg-[#FF70094D] w-full bg-[30%] rounded-[8px] text-[#FF7009] font-Geist text-[16px] py-[16px] leading-[19.84px] mt-[35px]"
          onClick={connectWallet}
        >
          CONNECT WALLET
        </button>
      )}
      {schemeState === "deposit_token" && wallet && (
        <button
        className="bg-[#FF70094D] w-full bg-[30%] rounded-[8px] text-[#FF7009] font-Geist text-[16px] py-[14px] leading-[19.84px] mt-[35px]"
          onClick={stake}
        >
          DEPOSIT TOKEN <span className='font-medium text-[25px] font-light pl-2'>{'->'}</span>
        </button>
      )}
      {(schemeState === "claim_token" && wallet) && (
        <button
        className="bg-[#FF70094D] w-full bg-[30%] rounded-[8px] text-[#FF7009] font-Geist text-[16px] py-[16px] leading-[19.84px] mt-[15px]"
          onClick={() => claim()}
        >
          CLAIM NOW <span className='text-2xl font-medium pl-2 font-light text-[25px]'>{'->'}</span>
        </button>
      )}
      {schemeState === "claimed" && (
        <div className="bg-[#FF70091A] w-full bg-[10%] rounded-[8px] text-[#FF7009] font-Geist text-[16px] py-[16px] leading-[19.84px] mt-[15px]">
          CLAIMED
        </div>
      )}
    </div>
  );
};

export default SchemeButton;
