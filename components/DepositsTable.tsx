"use client"
import { useQuery } from "@apollo/client";
import client from "@/client/apollo-client";
import { GET_DEPOSIT } from "@/queries";

export default function DepositsTable({userAccount = '0xb60113f7700549416fcf99d6308be013e0b09ff5'}) {
    const { loading, error, data } = useQuery(GET_DEPOSIT, {
        variables: { user: userAccount },
        client: client,
      });
  return <div>Hello addis</div>;
}
