// src/pages/Transactions.tsx
import React from "react";
import TransactionCard from "../components/TransactionCard";

const dummyTransactions = [
  {
    id: 1,
    type: "Project Payment",
    amount: "₹5,000",
    date: "June 25, 2025",
    status: "Completed" as "Completed" | "Pending" | "Failed",
  },
  {
    id: 2,
    type: "Withdrawal",
    amount: "₹2,000",
    date: "June 20, 2025",
    status: "Pending" as "Completed" | "Pending" | "Failed",
  },
  {
    id: 3,
    type: "Refund",
    amount: "₹800",
    date: "June 10, 2025",
    status: "Failed" as "Completed" | "Pending" | "Failed",
  },
];

const Transactions = () => {
  return (
    <div className="p-5 max-w-3xl w-full mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Transactions</h2>

      <div className="space-y-4">
        {dummyTransactions.map((tx) => (
          <TransactionCard key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
