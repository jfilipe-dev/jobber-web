import React from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

import { Header, Title, Close, Content, Container } from "./styles";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const CustomModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}: ConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      shouldCloseOnOverlayClick
      style={{
        content: {
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "0",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Container>
        <Header>
          <Title>{title}</Title>
          <Close>
            <IoMdClose size={24} color="black" onClick={onClose} />
          </Close>
        </Header>

        <Content>{children}</Content>
      </Container>
    </Modal>
  );
};

export default CustomModal;
