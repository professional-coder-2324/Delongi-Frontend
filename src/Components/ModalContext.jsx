import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showNewOrdersModal, setShowNewOrdersModal] = useState(false);

  const openNewOrdersModal = () => {
    setShowNewOrdersModal(true);
  };

  const closeNewOrdersModal = () => {
    setShowNewOrdersModal(false);
  };

  return (
    <ModalContext.Provider
      value={{
        openNewOrdersModal,
        showNewOrdersModal,
        closeNewOrdersModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
