export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: TransactionCategory;
  createdAt: string;
}

export type TransactionCategory = 
  | "home"
  | "supermarket"
  | "bills"
  | "transport"
  | "leisure"
  | "health"
  | "food"
  | "other"

  interface TransactionCategoryTypes {
    id: number;
    type: TransactionCategory;
    value: string;
  }
  
  export const transactionCategories: TransactionCategoryTypes[] = [
    { id: 1, value: "Home", type: "home" },
    { id: 2, value: "Bills", type: "bills" },
    { id: 3, value: "Food", type: "food" },
    { id: 4, value: "Health", type: "health" },
    { id: 5, value: "Leisure", type: "leisure" },
    { id: 6, value: "Market", type: "supermarket" },
    { id: 7, value: "Transport", type: "transport" },
    { id: 8, value: "Other", type: "other" },
  ];
  