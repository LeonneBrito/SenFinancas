import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { Transaction } from "../@types";

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  editTransaction: (
    transactionId: string,
    editTransaction: TransactionInput
  ) => void;
  removeTransaction: (transactionId: string) => void;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({
  children,
}: TransactionsProviderProps): JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadTransactions = localStorage.getItem("@SenFinanca:Transactions");
    if (loadTransactions) {
      setTransactions(JSON.parse(loadTransactions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "@SenFinanca:Transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  async function createTransaction(transactionInput: TransactionInput) {
    const newTransaction: Transaction = {
      id: uuidv4(),
      ...transactionInput,
      createdAt: String(new Date()),
    };
    setTransactions([...transactions, newTransaction]);
  }

  function editTransaction(
    transactionsId: string,
    editTransaction: TransactionInput
  ) {
    const updatedTransaction = transactions.map((transaction) =>
      transaction.id === transactionsId
        ? {
            ...transaction,
            ...editTransaction,
          }
        : transaction
    );
    setTransactions(updatedTransaction);
  }

  function removeTransaction(transactionId: string) {
    const filteredTransactions = transactions.filter(
      (t) => t.id !== transactionId
    );
    setTransactions(filteredTransactions);
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        removeTransaction,
        editTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
