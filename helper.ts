export const getGlobalDeposit = (data: any[] | undefined) => {
  if (!data) return "0";
  const totalAmount: number = data.reduce((accumulator, deposit) => {
    return Number(accumulator) + Number(deposit.amount);
  }, 0);

  return (totalAmount / 10e6).toString();
};

export const getMyDeposit = (data: any[] | undefined, account: string) => {
  if (!data) return "0";
  const myDeposits = data.filter((deposit) => deposit.user === account);
  const totalAmount: number = myDeposits.reduce((accumulator, deposit) => {
    return Number(accumulator) + Number(deposit.amount);
  }, 0);

  return (totalAmount / 10e6).toString();
};

export type TableData = {
  date: string;
  amount: string;
  point: string;
  unlocked: string;
};

export let prepareTableData = (data: any[], account: string): TableData[] => {
  if (!data) return [] as TableData[];

  const myDeposits = data.filter((deposit) => deposit.user === account);
  const tableData: TableData[] = [];
  myDeposits.forEach((deposit) => {
    tableData.push({
      date: convertToDate(deposit?.stakeTime),
      amount: (Number(deposit.amount) / 10e6).toString(),
      point: "--",
      unlocked: "1:53:42", //TODO
    });
  });
  return tableData;
};

const convertToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Month is zero-based
  const day = ("0" + date.getDate()).slice(-2);

  return `${month}/${day}`;
};
export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}: ${minutes}: ${remainingSeconds}`;
};