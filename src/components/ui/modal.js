import React from "react";

import styled from "styled-components";
import Backdrop from "./backdrop";

const ModalStyles = styled.div`
  position: fixed;
  z-index: 500;
  background-color: white;
  width: 70rem;
  border: 1px solid #ccc;
  color: #030303;
  box-shadow: 1px 1px 1px black;
  padding: 1rem;
  margin: 0 auto;
  left: 50%;
  margin-left: -34rem;
  top: 10%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  @media (max-width: 1200px) {
    width: 54rem;
    margin-left: -26rem;
  }
  @media (max-width: 900px) {
    width: 36rem;
    margin-left: -18rem;
  }
`;

const Modal = ({ showModal, children, onModalClose }) => {
  return (
    <div>
      <Backdrop showModal={showModal} onModalClose={onModalClose} />
      <ModalStyles
        style={{
          transform: showModal ? "translateY(0)" : "translateY(-100vh)",
          opacity: showModal ? "1" : "0",
        }}
      >
        {children}
      </ModalStyles>
    </div>
  );
};

export default Modal;
