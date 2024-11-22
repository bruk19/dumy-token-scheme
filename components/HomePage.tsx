"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import SchemeButton from "./schemeButton";
import InputField from "./Input";
import { useQuery } from "@apollo/client";
import client from "@/client/apollo-client";
import { GET_DEPOSIT } from "@/queries";
import { getGlobalDeposit, getMyDeposit, prepareTableData, formatTime } from "@/helper";
import { useWalletProviderContext } from "./WalletProvider";


function HomePage() {
  const [amount, setAmount] = useState<string>("0");
  const [balance, setBalance] = useState(0)
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [isSchemeStarted, setSchemeStarted] = useState<boolean>(false)
  function calculateRemainingTime(timestamp: number): number {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const remainingSeconds = timestamp - currentTime;
    return remainingSeconds >= 0 ? remainingSeconds : 0;
  }

  const isTotalDeposit = false;
  let isClaim = false
  let isClaimed = false;


  const {wallet, usdtContractInstance} = useWalletProviderContext()

  const { loading, error, data } = useQuery(GET_DEPOSIT, {
    variables:{
      wallet: wallet
    }, 
    client: client,
  });

  useCallback(() => {
    isClaim = remainingTime === 0 &&  data?.deposits.length > 0
  }, [remainingTime, data])

  const getBalance = useCallback(async () => {
    if (!usdtContractInstance || !wallet) return 0;

    try {
      const [balance, decimal] = await Promise.all([
        usdtContractInstance.balanceOf(wallet),
        usdtContractInstance.decimals()
      ]);
       return (Number(balance) / Number(decimal));
    } catch (error) {
      console.error('Error fetching balance:', error);
      return 0;
    }
  }, [usdtContractInstance, wallet]); 

  useEffect(() => {
    const fetchBalance = async () => {
      const fetchedBalance = await getBalance();
      if (fetchedBalance !== null) {
        setBalance(fetchedBalance);
      }
    };
    const interval = setInterval(() => {
      setRemainingTime(calculateRemainingTime(Number(data?.deposits[0].stakeTime) + 2 * 60 * 60));
    }, 1000);

    fetchBalance();
    return () => clearInterval(interval);
  }, [getBalance]);

  const handleMaxAmount = (balance: string) => {
    setAmount(balance)
  }

  const handleIsClaimed = () => {
    isClaimed = true
  }

  const handleInput = () => {
    setAmount('')
  }

  setTimeout(() => {
    setSchemeStarted(true)
  }, 20000);

  return (
    <div className="py-16">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="py-6 px-8 rounded-[8px] bg-[#0D0D0D] border border-[#1A1919] md:mt-4">
          <div className="flex md:flex-row flex-col md:gap-[120px] gap-10">
            <div>
              <p className="font-Geist text-[24px] font-medium leading-[29.76px] text-left md:px-[28px] md:py-[24px] text-primary">
                Overview
              </p>
               {isClaim ? (
                <div className="h-[10px]"></div> 
              ) : (
                isSchemeStarted ? (
                  <p className="font-Geist text-[18px] mt-3 mx-[19px] p-[10px] flex justify-center items-center font-medium rounded-[32px] leading-[22.32px] text-[#1BA27A] bg-[#002319]">
                    Scheme Has Started
                  </p>
                ) : (
                  <p className="font-Geist text-[18px] mt-[12px] mx-[15px] p-[10px] flex justify-center items-center font-medium rounded-[32px] leading-[22.32px] text-[#A28B1B] bg-[#231D00]">
                    Scheme Has Not Started
                  </p>
                )
              )}
            </div>
            <div className="flex md:flex-row flex-col md:mt-[40px] mt-10 md:gap-14 gap-8 px-6">
              <div className="flex md:flex-col flex-row gap-6 md:gap-0">
                <p className="text-[#5C5C5C] font-Geist text-[16px] w-[121px] leading-[19.84px]">
                  Global Deposit
                </p>
                <div className="flex md:mt-[10px] mt-0 justify-end gap-[5px]">
                {isTotalDeposit ? (
                  <p className="text-[#5C5C5C] font-Geist text-[16px] leading-[19.84px]">
                    {loading || error ? "--" : getGlobalDeposit(data?.deposits)}
                  </p>
                  ) : (
                    <p className="text-[#5C5C5C] font-Geist text-[16px] leading-[19.84px]">
                    --
                    </p>
                  )}
                  <Image src="/USDT.png" alt="usdt" width={20} height={20} />
                </div>
              </div>
              <div className="flex md:flex-col flex-row md:gap-0 gap-6">
                <p className="text-[#5C5C5C] font-Geist text-[16tpx] w-[148px] h-[20px] leading-[19.84px]">
                  Your Total Deposits
                </p>
                <div className="flex md:mt-[10px] justify-end items-center gap-[4px]">
                  <p className="text-white font-Geist text-[16px] leading-[19.84px]">
                    {loading || error
                      ? "--"
                      : getMyDeposit(
                          data?.deposits,
                          wallet || ''
                        )}
                  </p>

                  <Image src="/USDT.png" alt="usdt" width={20} height={20} />
                </div>
              </div>
              <div className="flex md:flex-col flex-row md:gap-0 gap-8">
                <p className="text-[#5C5C5C] font-Geist text-[16px] leading-[19.84px]">
                  Your Total Points
                </p>
                <div className="flex justify-end pt-1">
                  {isTotalDeposit ? (
                    <p className="text-white font-Geist text-[16px] leading-[19.84px]">
                      111
                    </p>
                  ) : (
                    <p className="text-[#5C5C5C] font-Geist text-[16px] leading-[19.84px]">
                      --
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isClaim && isClaimed && (
          <div className="w-[75.5%] mt-[190px] flex justify-between h-[174px]">
            <div className="bg-[#0D0D0D] w-full h-[154px] relative top-[21px] border border-[#1A1919] flex justify-between items-center rounded-[8px]">
              <div className="mx-[28px]">
                <p className="text-primary font-Geist text-[24px] leading-[29.76px]">
                  Deposits Claimed
                </p>
                <p className="text-[#525252] max-w-[308px] font-Geist text-[16px] leading-[19.84px] pt-2">
                  All your deposits and reward have been successfully claimed
                  back.
                </p>
              </div>
              <div className="w-[392px] mr-4">
                <div className="flex justify-between bg-[#141414] py-[6px] gap-x-15 items-center rounded-[8px] pl-2">
                  <div className="flex">
                    <div className="max-w-[65px] max-h-[65px] justify-center items-center pr-1">
                      <Image
                        src="/Frame.png"
                        alt="usdt"
                        width={20}
                        height={20}
                      />
                    </div>
                    <p className="text-[#93C926] font-Geist text-[16px] leading-[19.84px] relative left-1">
                      Claimed
                    </p>
                  </div>
                  <div className="flex items-center flex-end rounded-[8px] py-1 ">
                    <p className="text-primary font-Geist text-[32px] leading-[39.68px] pr-1">
                      120
                    </p>
                    <div className="max-w-[65px] max-h-[65px] pr-4">
                      <Image
                        src="/USDT.png"
                        alt="usdt"
                        width={25}
                        height={25}
                      />
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <SchemeButton amount={amount} isClaim={isClaim} callback={handleIsClaimed} isSchemaStarted={isSchemeStarted}/>
                </div>
              </div>
            </div>
          </div>
        )}
        {isClaim && !isClaimed && (
          <div className="w-[75.5%] mt-[190px] flex justify-between h-[154px]">
            <div className="bg-[#0D0D0D] w-full mt-[30px] border border-[#1A1919] flex justify-between rounded-[8px]">
              <div className="mx-[28px] mt-[38px]">
                <p className="text-primary font-Geist text-[24px] leading-[29.76px]">
                  Ready to Claim.
                </p>
                <p className="text-[#525252] font-Geist text-[16px] leading-[19.84px] mt-2">
                  Your deposits and reward are ready to be claimed back.
                </p>
              </div>
              <div className="max-w-[392px] mr-2">
                <div className="flex justify-center items-center rounded-[8px] bg-[#141414] py-1 px-[124px] mt-[5px]">
                  <p className="text-primary font-Geist text-[32px] leading-[39.68px]">
                    120
                  </p>
                  <div className="max-w-[25px] max-h-[25px] mx-2">
                    <Image src="/USDT.png" alt="usdt" width={35} height={35} />
                  </div>
                </div>
                <div className="relative bottom-2 max-h-[27px]">
                  <SchemeButton amount={amount} isClaim={isClaim} isSchemaStarted={isSchemeStarted}/>
                </div>
              </div>
            </div>
          </div>
        )}
        {!isClaim && (
          <div className="md:w-[75.5%] w-[95%] md:mt-32 mt-14 flex md:flex-row flex-col justify-center px-4">
            <div className="bg-[#0D0D0D] md:w-[65.5%] w-full mt-[30px] md:border md:border-[#1A1919] max-h-[502px] rounded-[8px]">
              <div className="flex flex-col">
                <p className="ml-[16px] mt-[16px] text-primary font-Geist text-[16px] leading-[19.84px]">
                  Your Deposits
                </p>
                <div>
                  <table className=" w-full mt-[8px]">
                    <thead className="border-t-[1px] border-b-[1px] border-[#1A1919]">
                      <tr className="text-[#5C5C5C] font-Geist font-medium md:text-[18px] text-[14px] leading-[19.84px] flex items-center md:gap-6 gap-4 px-3">
                        <th
                          className="py-[6px] text-[#5C5C5C] font-Geist font-medium leading-[19.84px] md:text-[18px] text-[12px]"
                          scope="col"
                        >
                          Date
                        </th>
                        <th
                          className="text-[#5C5C5C] font-Geist font-medium leading-[19.84px] md:text-[18px] text-[12px]"
                          scope="col"
                        >
                          Deposit Amount
                        </th>
                        <th
                          className="text-end text-[#5C5C5C] font-Geist font-medium leading-[19.84px] md:text-[18px] text-[12px]"
                          scope="col"
                        >
                          Points Gained
                        </th>
                        <th
                          className="text-end pl-2 text-[#5C5C5C] font-Geist font-medium leading-[19.84px] md:text-[18px] text-[12px]"
                          scope="col"
                        >
                          Unlocks In
                        </th>
                      </tr>
                    </thead>
                    <tbody className="gap-y-2 ">
                    {prepareTableData(
                        data?.deposits,
                        wallet || '' 
                      )?.length === 0 && (

                        <tr>
                        <td colSpan={5}>
                          <div className="w-full h-full flex flex-col justify-center items-center pb-20">
                            <Image
                              className="md:mt-32 mt-20"
                              src="/Locker-Safe.png"
                              alt="usdt"
                              width={41}
                              height={41}
                            />
                            <p className="text-[#A3A3A3] font-Geist text-[14px] mt-3 leading-[15.41px]">
                              No Deposits
                            </p>
                            <p className="text-[#525252] font-Geist text-[14px] mt-3 leading-[20px]">
                              Start depositing to earn points
                            </p>
                          </div>
                        </td>
                      </tr>
                      )}
   
                      {prepareTableData(
                        data?.deposits,
                        wallet || ''
                      )?.length > 0 && prepareTableData(
                        data?.deposits,
                        wallet || ''
                      )?.map((item, index) => (
                        <tr key={index} className="text-center gap-2 py-2">
                          <td className="text-[#5C5C5C] font-Geist text-[16px] leading-[19.84px] font-medium">
                            {item.date}
                          </td>
                          <td className="text-primary font-Geist text-[16px] leading-[19.84px] font-medium mt-5 flex justify-start pl-6 items-center">
                            {item.amount}{" "}
                            <Image
                              className="ml-1"
                              src="/USDT.png"
                              alt="usdt"
                              width={17}
                              height={17}
                            />
                          </td>
                          <td className="text-primary font-Geist text-[16px] leading-[19.84px] text-end font-medium">
                            {item.point}
                          </td>
                          <td className="text-primary font-Geist text-[16px] text-end leading-[19.84px] font-medium">
                            {formatTime(remainingTime ?remainingTime : 0)}
                          </td>
                          <td>
                            <button className="bg-[#262626] px-[12px] py-[6px] my-4 text-[#A3A3A3] rounded-[4px] font-Geist text-[14px] leading-[15.41px]">
                              Withdraw
                            </button>
                          </td>
                        </tr>
                      ))}
                      {}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="md:w-[31.7%] h-[228px] bg-[#0D0D0D] border border-[#1A1919] relative mt-[30px] ml-[25px] rounded-[8px]">
              <div className="flex justify-between items-center px-[15px] py-[20px]">
                <p className="text-primary font-Geist text-4 leading-[19.84px]">
                  Create Deposite
                </p>
                <div className="flex justify-center items-center gap-2">
                  <p className="text-[#5C5C5C] font-family-Geist text-xs font-semibold leading-[14.88px]">
                    WALLET:
                    <span className="text-[#5C5C5C] font-Geist text-[12px] leading-[14.88px]">
                      {wallet ? `$${balance}` : "--"}
                    </span>
                  </p>
                  <button className="px-2 py-1 bg-[#FF700933] flex justify-center text-[12px] rounded-[4px] items-center bg-[20%] shadow-[0px_0.77px_1.54px_0px_#0000000D] text-[#FF7009]" onClick={() => handleMaxAmount(balance.toString())}>
                    MAX
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-full justify-center items-center">
                <InputField value={amount} onChange={setAmount} />
                <div className="flex absolute top-20 right-4 mt-1 gap-1 mr-2">
                  <p className="text-white text-[18px] text-[#292929]">0.00</p>
                  <Image src="/USDT.png" alt="usdt" width={25} height={10} />
                </div>
                <div className="w-[90%]">
                  <SchemeButton amount={amount}  inputCallback={handleInput} isSchemaStarted={isSchemeStarted}/>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;