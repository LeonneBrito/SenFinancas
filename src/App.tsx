import { useState } from "react";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { Dashboard } from "./components/Dashboard";
import { TransactionsProvider } from "./hooks/useTransactions";
import { NewTransactionModal } from "./components/NewTransactionModal";

export function App() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  function handleOpenTransactionModal() {
    setIsTransactionModalOpen(true);
  }

  function handleCloseTransactionModal() {
    setIsTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header openModal={ handleOpenTransactionModal }/>
      <Dashboard />
      <NewTransactionModal
        isOpen={ isTransactionModalOpen }
        onRequestClose = { handleCloseTransactionModal }
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
