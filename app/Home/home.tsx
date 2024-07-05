'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import SchemeButton from './schemeButton';
import InputField from '../Input/input';

type RowData = {
  date: string;
  depositAmount: string;
  pointsGained: string;
  unlocksIn: string;
};

const data: RowData[] = [
  {
    date: '23/06',
    depositAmount: '40.00',
    pointsGained: '--',
    unlocksIn: '1:53:42',
  },
  {
    date: '24/06',
    depositAmount: '50.00',
    pointsGained: '20',
    unlocksIn: '2:00:00',
  },
  {
    date: '25/06',
    depositAmount: '30.00',
    pointsGained: '10',
    unlocksIn: '1:30:00',
  },
];

function HomePage() {
  const [amount, setAmount] = useState<string>('');
  const isSchemeStarted = false;
  const isTotalDeposit = false;
  const isWallet = true;
  const isClaim = false;
  const isClaimed = false;
  const isYourDeposite = false;

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="absolute w-[75.5%] h-[140px] top-[109px] rounded-[8px] bg-[#0D0D0D] border border-[#1A1919]">
          <div className="flex justify-between pr-[50px]">
            <div>
              <p className="font-Geist text-[24px] font-medium leading-[29.76px] text-left px-[28px] pt-6 text-primary">
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
                  <p className="font-Geist text-[18px] mt-[12px] mx-[19px] p-[10px] flex justify-center items-center font-medium rounded-[32px] leading-[22.32px] text-[#A28B1B] bg-[#231D00]">
                    Scheme Has Not Started
                  </p>
                )
              )}
            </div>
            <div className="flex mt-[40px]">
              <div>
                <p className="text-[#5C5C5C] font-Geist text-[16px] leading-[19.84px]">
                  Global Deposit
                </p>
                <div className="flex mt-[10px] justify-end gap-[5px]">
                  {isTotalDeposit ? (
                    <p className="text-primary font-Geist text-[16px] leading-[19.84px]">
                    1020.56
                  </p>
                  ) : (
                    <p className="text-[#5C5C5C] font-Geist text-[16px] leading-[19.84px]">
                      --
                      </p>
                  )}
                  <Image src="/USDT.png" alt="usdt" width={20} height={20} />
                </div>
              </div>
              <div className="mx-[50px] ">
                <p className="text-[#5C5C5C] font-Geist text-[16tpx] leading-[19.84px]">
                  Your Total Deposits
                </p>
                <div className="flex mt-[10px] justify-end gap-[4px]">
                  {isTotalDeposit ? (
                    <p className="text-white font-Geist text-[16px] leading-[19.84px]">
                      120.00
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
                      800,000
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
          <div className="w-[75.5%] mt-[190px] flex justify-between">
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
                  <SchemeButton />
                </div>
              </div>
            </div>
          </div>
        )}
        {isClaim && !isClaimed && (
          <div className="w-[75.5%] mt-[190px] flex justify-between h-[154px]">
            <div className="bg-[#0D0D0D] w-full relative top-[21px] border border-[#1A1919] flex justify-between rounded-[8px]">
              <div className="mx-[28px] mt-[38px]">
                <p className="text-primary font-Geist text-[24px] leading-[29.76px]">
                  Ready to Claim
                </p>
                <p className="text-[#525252] max-w-[242px] font-Geist text-[16px] leading-[19.84px] mt-2">
                  Your deposits and reward are ready to be claimed back.
                </p>
              </div>
              <div className="max-w-[392px] mr-4">
                <div className="flex justify-center items-center rounded-[8px] bg-[#141414] mt-[16px] py-[10px] px-[124px]">
                  <p className="text-primary font-Geist text-[32px] leading-[39.68px]">
                    120
                  </p>
                  <div className="max-w-[25px] max-h-[25px] mx-2">
                    <Image src="/USDT.png" alt="usdt" width={35} height={35} />
                  </div>
                </div>
                <div className="relative max-h-[47px]">
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
                  <table className="w-full mt-[16px] ml-2 mx-2">
                    <thead className="border-t-[1px] border-b-[1px] border-[#1A1919]">
                      <tr className="text-[#5C5C5C] font-Geist text-base font-medium leading-[19.84px]">
                        <th className="py-[6px] text-[#5C5C5C] font-Geist text-base font-medium leading-[19.84px]" scope="col">
                          Date
                        </th>
                        <th className='text-[#5C5C5C] font-Geist text-base font-medium leading-[19.84px]' scope="col">
                          Deposit Amount
                        </th>
                        <th className='text-end text-[#5C5C5C] font-Geist text-base font-medium leading-[19.84px]' scope="col">Points Gained</th>
                        <th className='text-end pl-2 text-[#5C5C5C] font-Geist text-base font-medium leading-[19.84px]' scope="col">Unlocks In</th>
                        <th className="pr-4 text-[#0D0D0D]" scope="col">
                          New Column
                        </th>
                      </tr>
                    </thead>
                    {isYourDeposite && (
                      <tbody className="gap-y-2">
                        {data.map((item, index) => (
                          <tr key={index} className="text-center gap-2 py-2">
                            <td className="text-[#5C5C5C] font-Geist text-[16px] leading-[19.84px] font-medium">
                              {item.date}
                            </td>
                            <td className="text-primary font-Geist text-[16px] leading-[19.84px] font-medium mt-5 flex justify-start pl-6 items-center">
                              {item.depositAmount}{' '}
                              <Image
                                className="ml-1"
                                src="/USDT.png"
                                alt="usdt"
                                width={17}
                                height={17}
                              />
                            </td>
                            <td className="text-primary font-Geist text-[16px] leading-[19.84px] text-end font-medium">
                              {item.pointsGained}
                            </td>
                            <td className="text-primary font-Geist text-[16px] text-end leading-[19.84px] font-medium">
                              {item.unlocksIn}
                            </td>
                            <td>
                              <button className="bg-[#262626] px-[12px] py-[6px] my-4 text-[#A3A3A3] rounded-[4px] font-Geist text-[14px] leading-[15.41px]">
                                Withdraw
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                    {!isYourDeposite && (
                      <tbody>
                        <tr>
                          <td colSpan={5}>
                            <div className="w-full h-full flex flex-col justify-center items-center">
                              <Image
                                className="mt-32"
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
                      </tbody>
                    )}
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
                  <p className="text-[#5C5C5C] font-family-Geist text-xs font-semibold leading-[14.88px]">
                    WALLET:
                    <span>
                      {isWallet ? '$23.44' : '--'}
                    </span>
                  </p>
                  <span className="px-2 py-1 bg-[#FF700933] flex justify-center text-[12px] rounded-[4px] items-center bg-[20%] shadow-[0px_0.77px_1.54px_0px_#0000000D] text-[#FF7009]">
                    MAX
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full justify-center items-center">
                <InputField value={amount} onChange={setAmount} />
                <div className="flex absolute top-20 right-4 mt-1 gap-1 mr-2">
                  <p className="text-white text-[18px] text-[#292929]">0.00</p>
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
