import Swal from "sweetalert2";
import { Transaction } from "../../@types";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { EditTransactionModal } from "../EditTransactionModal";
import { useTransactions } from "../../hooks/useTransactions";
import { useState } from "react";

interface TransactionItemProps {
  transaction: Transaction;
}

const categoriesNames = {
  home: "Home",
  bills: "Bills",
  food: "Food",
  health: "Health",
  leisure: "Leisure",
  supermarket: "Market",
  transport: "Transport",
  other: "Other",
};

export function TransactionItem({ transaction }: TransactionItemProps) {
  const { removeTransaction } = useTransactions();

  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false);

  async function handleOpenEditModal() {
    setIsEditTransactionModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditTransactionModalOpen(false);
  }

  async function handleDelete(transactionId: string) {
    await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this transaction?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        removeTransaction(transactionId);
        await Swal.fire(
          "Deleted!",
          "Your transaction has been deleted.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        await Swal.fire("Canceled", "Your transaction has been saved", "error");
      }
    });
  }

  return (
    <>
      <EditTransactionModal
        isOpen={isEditTransactionModalOpen}
        onRequestClose={handleCloseEditModal}
        transaction={transaction}
      />
      <tr key={transaction.id}>
        <td>{transaction.title}</td>
        <td className={transaction.type}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(transaction.amount)}
        </td>
        <td>{categoriesNames[transaction.category]}</td>
        <td>
          {new Intl.DateTimeFormat("pt-BR").format(
            new Date(transaction.createdAt)
          )}
        </td>
        <td>
          <button onClick={() => handleOpenEditModal()}>
            <FiEdit3 />
          </button>
          <button onClick={() => handleDelete(transaction.id)}>
            <FiTrash />
          </button>
        </td>
      </tr>
    </>
  );
}
