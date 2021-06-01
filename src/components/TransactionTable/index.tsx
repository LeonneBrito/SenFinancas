import { Container } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";
import { TransactionItem } from "../TransactionItem";
import { useState } from "react";

export function TransactionTable() {
  const { transactions } = useTransactions();
  const [filter, setFilter] = useState("");

  return (
    <Container>
      <input
        placeholder="Filter your results"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions
            .filter(val => {
              if (filter === "") {
                return val;
              } else if (
                val.title.toLowerCase().includes(filter.toLowerCase()) ||
                val.category.toLowerCase().includes(filter.toLowerCase()) ||
                val.type.toLowerCase().includes(filter.toLowerCase())
              )
                return val;
            })
            .map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
        </tbody>
      </table>
    </Container>
  );
}
