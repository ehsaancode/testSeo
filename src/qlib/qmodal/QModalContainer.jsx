import React from "react";
import { useModal } from "./QModalProvider";

const QModalContainer = ({ name, children, maxWidth = "97%", maxHeight = "500px" }) => {
  const { topModal, closeModal } = useModal();
  const isOpen = topModal === name;  // <-- UPDATED

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-[9999]"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        pointerEvents: "auto",
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-lg relative"
        style={{
          maxWidth,
          maxHeight,
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <button
          onClick={closeModal}
          className="cursor-pointer absolute top-2 right-3 text-gray-600 hover:text-black text-xl z-99"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default QModalContainer;
QModalContainer.displayName = "QModalContainer";