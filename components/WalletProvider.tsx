"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ethers } from "ethers";

import { getWeb3, setUpWeb3 } from "@/web3";
import { abi, erc20Abi } from "@/abi";
import { contractAddress, usdtAddress } from "@/config";

type WalletContext = {
  wallet: string | null;
  contractInstance: ethers.Contract | undefined;
  usdtContractInstance: ethers.Contract | undefined;
  chainId: number | undefined;
  mantleNetwork: NetworkParam;
  switchNetwork: () => Promise<void>;
  connectWallet: () => Promise<void>;
};

interface GlobalStateProviderProps {
  children: ReactNode;
}

type NetworkParam = {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
};

const mantleNetwork: NetworkParam = {
  chainId: 5003, // 5003 in hexadecimal
  chainName: "Mantle Sepolia",
  nativeCurrency: {
    name: "MNT",
    symbol: "MNT",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.sepolia.mantle.xyz"],
  blockExplorerUrls: ["https://explorer.sepolia.mantle.xyz"],
};

const WalletProviderContext = createContext<WalletContext>({} as WalletContext);

export const WalletProvider = ({ children }: GlobalStateProviderProps) => {
  const [wallet, setWalletAddress] = useState<string | null>(null);
  const [contractInstance, setContract] = useState<ethers.Contract | undefined>(
    undefined
  );
  const [usdt, setUsdt] = useState<ethers.Contract | undefined>(
    undefined
  );
  const [chainId, setChainId] = useState<number | undefined>(undefined);

  const connectWallet = async () => {
    try {
      await setUpWeb3();
      const web3Instance = getWeb3();

      const signer = await web3Instance.getSigner();

      const contractInstance = new ethers.Contract(
        contractAddress,
        abi,
        signer
      );

      const usdtContract = new ethers.Contract(
        usdtAddress,
        erc20Abi,
        signer
      );

      setContract(contractInstance);
      setUsdt(usdtContract)

      const wallet = await signer.getAddress();
      setWalletAddress(wallet);
      const chainId = parseInt(
        await window.ethereum.request({ method: "eth_chainId" }),
        16
      );
      setChainId(chainId);
    } catch (error) {
      console.log("Error initializing: ", error);
      setWalletAddress(null);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on('accountsChanged', handleAccountChanged);

    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  const handleChainChanged = (chainId: string)  => {
    setChainId(parseInt(chainId, 16));   
  }

  const handleAccountChanged = (accounts: string[]) => {
    if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        console.log('Account changed:', accounts[0]);
      } else {
        setWalletAddress(null);
        console.log('No accounts available');
      }

  }

  const switchNetwork = async () => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed!");
      return;
    }

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ethers.toBeHex(mantleNetwork.chainId) }],
      });
      const chainId = parseInt(
        await window.ethereum.request({ method: "eth_chainId" }),
        16
      );
      setChainId(chainId);
    } catch (switchError: any) {
      if (switchError?.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [mantleNetwork],
          });
          const chainId = parseInt(
            await window.ethereum.request({ method: "eth_chainId" }),
            16
          );
          setChainId(chainId);
        } catch (addError) {
          console.error("Failed to add the network:", addError);
        }
      } else {
        console.error("Failed to switch the network:", switchError);
      }
    }
  };

  return (
    <WalletProviderContext.Provider
      value={{
        wallet,
        switchNetwork,
        connectWallet, // Make sure this is exported
        contractInstance,
        chainId,
        mantleNetwork,
        usdtContractInstance: usdt
      }}
    >
      {children}
    </WalletProviderContext.Provider>
  );
};

export const useWalletProviderContext = () => useContext(WalletProviderContext);
