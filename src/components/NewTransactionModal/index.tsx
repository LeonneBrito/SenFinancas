import Modal from "react-modal";
import { FormEvent, useState } from "react";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import { TransactionCategory, transactionCategories } from "../../@types";

Modal.setAppElement("#root");

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState<TransactionCategory>("home");
  const [type, setType] = useState("deposit");

  function resetForm() {
    setTitle("");
    setAmount(0);
    setCategory("home");
    setType("deposit");
    onRequestClose();
  }

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    await createTransaction({
      title,
      amount,
      category,
      type,
    });
    resetForm();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Register information</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {
              setType("deposit");
            }}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Deposit" />
            <span>Deposit</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => {
              setType("withdraw");
            }}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Withdraw" />
            <span>Withdraw</span>
          </RadioBox>
        </TransactionTypeContainer>
        <select
          onChange={(e) => setCategory(e.target.value as TransactionCategory)}
          defaultValue={category}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {transactionCategories.map((transaction) => (
            <option key={transaction.id} value={transaction.type}>
              {transaction.value}
            </option>
          ))}
        </select>
        <button type="submit">Register</button>
      </Container>
    </Modal>
  );
}
