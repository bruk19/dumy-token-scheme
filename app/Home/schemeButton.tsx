import React, { useEffect, useState } from 'react';
import { getWeb3, setUpWeb3 } from '../web3';
import { ethers } from 'ethers';
import { abi, contractAddress } from '../components/stakingReward';

function SchemeButton() {
  const [schemeState, setSchemeState] = useState('not_started');
  const [contract, setContract] = useState<ethers.Contract | undefined>(undefined)
  const [walletAddress, setWalletAddress] = useState<string | ''>('')
  const [amount, setAmount] = useState<string>('0');
  const [withdrawal, setWithdrawal] = useState<string | number>('')

      useEffect(() => {
    async function initialize() {
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
    }
    initialize();
  }, []);

  const stake = async() => {
    if(contract && window.ethereum !== undefined) {
      try {
        const amountBN = ethers.parseEther(amount);
        const tx = await contract.stake(amountBN);
        const receipt = await tx.wait();
        console.log('Deposited succesfully. Transaction receipt:',
          receipt)

        window.alert("Deposited succesfully")

      setAmount('')
      }
      catch (error) {
        console.log('Error on deposite:', error)
      }
    }
  }

  const claim = async() => {
    if(contract && window.ethereum !== undefined) {
      try {
        const tx = await contract.withdrawAndClaimAllRewards()
        const receipt = await tx.wait()
        console.log('Claimed succesfully. Transaction receipt:',
          receipt)
      }
      catch (error) {
        console.log('Error on claiming:', error)
      }
    }
  }

  const withdraw = async() => {
    if(contract && window.ethereum !== undefined) {
      try {
        const tx = await contract.withdraw(withdrawal)
        const receipt = await tx.wait()
        console.log('Withdrawal succesfully. Transaction receipt:',
          receipt)
      }
      catch (error) {
        console.log('Error on withdrawing', error)
      }
    }
  }

  const handleButtonClick = () => {
    switch (schemeState) {
      case 'not_started':
        console.log('SCHEME HAS NOT STARTED');
        setSchemeState('connect_wallet');
        break;
      case 'connect_wallet':
        console.log('CONNECT WALLET');
        setSchemeState('deposit_token');
        break;
      case 'deposit_token':
        console.log('DEPOSIT TOKEN ->');
        // Add your deposit logic here
        setSchemeState('claim_token');
        break;
      case 'claim_token':
        console.log('CLAIM NOW ->');
        setSchemeState('claimed');
        break;
      case 'claimed':
        console.log('CLAIMED');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {schemeState === 'not_started' && (
        <button
          className="bg-[#FF70091A] w-full bg-[20%] rounded-[8px] text-[#FF7009] font-Geist text-[16px] py-[16px] leading-[19.84px] mt-[20px]"
          onClick={handleButtonClick}
        >
          SCHEME HAS NOT STARTED
        </button>
      )}
      {schemeState === 'connect_wallet' && (
        <button
          className="bg-[#FF70091A] w-full bg-[20%] rounded-[8px] text-[#FF7009] font-Geist text-[16px] py-[16px] leading-[19.84px] mt-[20px]"
          onClick={handleButtonClick}
        >
          CONNECT WALLET
        </button>
      )}
      {schemeState === 'deposit_token' && (
        <button
          className="bg-[#FF70091A] w-full bg-[20%] rounded-[8px] text-[#FF7009] font-Geist text-[16px] py-[16px] leading-[19.84px] mt-[20px]"
          onClick={stake}
        >
          DEPOSIT TOKEN {'->'}
        </button>
      )}
      {schemeState === 'claim_token' && (
        <button
          className="bg-[#FF70091A] w-full bg-[20%] rounded-[8px] text-[#FF7009] font-Geist text-[16px] py-[16px] leading-[19.84px] mt-[20px]"
          onClick={claim}
        >
          CLAIM NOW {'->'}
        </button>
      )}
      {schemeState === 'claimed' && (
        <div className="bg-[#FF70091A] w-full bg-[10%] rounded-[8px] text-[#FF7009] font-Geist text-[16px] py-[16px] leading-[19.84px] mt-[20px]">
          CLAIMED
        </div>
      )}
    </div>
  );
}

export default SchemeButton;