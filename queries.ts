import { gql } from "@apollo/client";

export const GET_DEPOSIT = gql`
  query DepositQuery($wallet: String) {
    deposits {
      amount
      depositId
      id
      stakeTime
      user
      withdrawTime
    }
    rewardPaids(where: {user: $wallet}) {
      blockNumber
      blockTimestamp
      id
      reward
      transactionHash
      user
    }
  }
`;