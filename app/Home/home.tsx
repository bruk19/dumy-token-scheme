'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import SchemeButton from './schemeButton';
import Deposit from './deposit';
import InputField from '../Input/input';


function HomePage() {
  const [amount, setAmount] = useState<string>('0');
  const isSchemeStarted = true;
  const isTotalDeposit = false;
  const isWallet = true;
  const isClaim = false;
  const isClaimed = false;

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="absolute w-[75.5%] h-[140px] top-[109px] rounded-[8px] bg-[#0D0D0D] border border-[#1A1919]">
          <div className="flex">
            <div>
              <p className="w-[107px] h-[30px] font-Geist text-[24px] font-medium leading-[29.76px] text-left px-[28px] py-[28px] text-primary">
                Overview
              </p>
              {isSchemeStarted ? (
                <p className="font-Geist text-[16px] w-[211px] h-[42px] mt-[12px] mx-[19px] p-[10px] gap-[10px] flex justify-center items-center font-medium rounded-[32px] leading-[29.76px] text-[#1BA27A] bg-[#002319]">
                  Scheme Has Started
                </p>
              ) : (
                <p className="font-Geist text-[16px] w-[211px] h-[42px] mt-[12px] mx-[19px] p-[10px] gap-[10px] flex justify-center items-center font-medium rounded-[32px] leading-[22.32px] text-[#A28B1B] bg-[#231D00]">
                  Scheme Has Not Started
                </p>
              )}
            </div>
            <div className="flex mt-[40px] ml-[200px]">
              <div>
                <p className="text-[#5C5C5C] font-Geist text-[16px] w-[121px] h-[20px] leading-[19.84px]">
                  Global Deposit
                </p>
                <div className="flex mt-[10px] justify-end gap-[5px]">
                  <p className="text-[#5C5C5C] font-Geist text-[16px] leading-[19.84px]">
                    1020.56
                  </p>
                  <Image src="/USDT.png" alt="usdt" width={20} height={20} />
                </div>
              </div>
              <div className="mx-[50px] justify-end">
                <p className="text-[#5C5C5C] font-Geist text-[16tpx] w-[148px] h-[20px] leading-[19.84px]">
                  Your Total Deposits
                </p>
                <div className="flex mt-[10px] justify-end gap-[4px]">
                  {isTotalDeposit ? (
                    <p className="text-white font-Geist text-[16px] leading-[19.84px]">
                      111
                    </p>
                  ) : (
                    <p className="text-[#5C5C5C] font-Geist text-[16px] leading-[19.84px]">
                      --
                    </p>
                  )}
                  <Image src="/USDT.png" alt="usdt" width={20} height={20} />
                </div>
              </div>
              <div>
                <p className="text-[#5C5C5C] font-Geist text-[16px] leading-[19.84px]">
                  Your Total Points
                </p>
                <div className="flex mt-[10px] justify-end gap-[4px]">
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
            <div></div>
          </div>
        </div>
        {isClaim && isClaimed && (
          <div className="w-[75.5%] mt-[190px] flex justify-between h-[174px]">
            <div className="bg-[#0D0D0D] w-full mt-[30px] border border-[#1A1919] flex justify-between rounded-[8px]">
              <div className="mx-[28px] mt-[38px]">
                <p className="text-primary font-Geist text-[24px] leading-[29.76px]">
                  Deposits Claimed
                </p>
                <p className="text-[#525252] max-w-[308px] font-Geist text-[16px] leading-[19.84px] mt-2 pb-4">
                  All your deposits and reward have been successfully claimed
                  back.
                </p>
              </div>
              <div className="w-[392px] mr-2">
                <div className="flex justify-between mt-2 bg-[#141414] gap-x-15 items-center rounded-[8px] pl-2">
                  <div className='flex'>
                    <div className="max-w-[165px] max-h-[165px] justify-center items-center pr-1">
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
                  <div className="flex items-center flex-end rounded-[8px] py-1  mt-[10px]">
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
                <div className="relative bottom-2 max-h-[25px]">
                  <SchemeButton />
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
                  <SchemeButton />
                </div>
              </div>
            </div>
          </div>
        )}
        {!isClaim && (
          <div className="w-[75.5%] mt-[190px] flex">
            <div className="bg-[#0D0D0D] w-[65.5%] mt-[30px] border border-[#1A1919] h-[502px] rounded-[8px]">
              <div>
                <p className="ml-[16px] mt-[16px] text-primary w-[106px] font-Geist text-[16px] leading-[19.84px]">
                  Your Deposits
                </p>
                <div>
                  <table className=" w-full mt-[16px]">
                    <thead className=" border-t-[1px] border-b-[1px] border-[#1A1919]">
                      <tr className="text-[#5C5C5C] font-Geist text-[16px] leading-[19.84px] h-[20px] font-medium ">
                        <th className="py-[6px] ml-1" scope="col">
                          Date
                        </th>
                        <th className="ml-7" scope="col">
                          Deposite Amount
                        </th>
                        <th scope="col">Points Gained</th>
                        <th scope="col">Unclocks In</th>
                        <th className="pr-4 text-[#0D0D0D]" scope="col">
                          newcolumn
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-white">
                      <Deposit />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="w-[31.7%] h-[228px] bg-[#0D0D0D] border border-[#1A1919] relative mt-[30px] ml-[25px] rounded-[8px]">
              <div className="flex justify-between items-center px-[15px] py-[20px]">
                <p className="text-primary font-Geist text-4 leading-[19.84px]">
                  Create Deposite
                </p>
                <div className="flex justify-center items-center gap-2">
                  <p className="text-[#5C5C5C] font-Geist text-[12px] leading-[14.88px]">
                    WALLET:
                    <span className="text-[#5C5C5C] font-Geist text-[12px] leading-[14.88px]">
                      {isWallet ? '$23.44' : '--'}
                    </span>
                  </p>
                  <span className="px-2 py-1 bg-[#FF700933] flex justify-center items-center bg-[20%] shadow-[0px_0.77px_1.54px_0px_#0000000D] text-[#FF7009]">
                    MAX
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full justify-center items-center">
                <InputField value={amount} onChange={setAmount} />
                <div className="flex absolute top-20 right-4 mt-3 gap-1">
                  <p className="text-white text-[#292929]">0.00</p>
                  <Image src="/USDT.png" alt="usdt" width={25} height={10} />
                </div>
                <div className="w-[90%]">
                  <SchemeButton />
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
