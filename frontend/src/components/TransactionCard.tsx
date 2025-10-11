// src/components/TransactionCard.tsx
import React from "react";
import { BadgeCheck, Clock, XCircle } from "lucide-react";

interface Transaction {
  type: string;
  amount: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Completed":
      return { color: "text-green-600", icon: <BadgeCheck className="w-5 h-5 text-green-500" /> };
    case "Pending":
      return { color: "text-yellow-600", icon: <Clock className="w-5 h-5 text-yellow-500" /> };
    case "Failed":
      return { color: "text-red-600", icon: <XCircle className="w-5 h-5 text-red-500" /> };
    default:
      return { color: "text-gray-600", icon: null };
  }
};

const TransactionCard: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const { color, icon } = getStatusStyle(transaction.status);

  return (
    <div className="border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-lg font-medium">{transaction.type}</h3>
        <div className="flex items-center gap-2">
          {icon}
          <span className={`text-sm font-medium ${color}`}>{transaction.status}</span>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>{transaction.date}</span>
        <span className="font-semibold text-blue-600">{transaction.amount}</span>
      </div>
    </div>
  );
};

export default TransactionCard;
