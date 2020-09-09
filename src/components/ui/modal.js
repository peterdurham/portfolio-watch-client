import React from "react";

import styled from "styled-components";
import Backdrop from "./backdrop";

const ModalStyles = styled.div`
  position: fixed;
  z-index: 500;
  background-color: ${(props) => props.theme.themeDark};
  width: 30rem;
  color: #fff;
  box-shadow: 10px 20px 50px rgba(3, 3, 3, 0.5);
  padding: 24px;
  margin: 0 auto;
  left: 50%;
  margin-left: -15rem;
  border-radius: 4px;
  top: 10%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  display: flex;
  flex-direction: column;

  .modal-container {
    width: 200px;
    margin: 0 auto;
  }

  h3 {
    font-size: 28px;
    margin-bottom: 24px;
  }
  label,
  input,
  button {
    display: block;
  }
  label {
    margin-bottom: 12px;
    font-size: 20px;
    align-self: flex-end;
  }
  input {
    height: 30px;
    background: ${(props) => props.theme.themeLight};
    color: #fff;
    margin-bottom: 24px;
    padding: 0 8px;
    align-self: flex-end;
  }
  button {
    border: 1px solid #fff;
    font-weight: 700;
  }
  button:hover {
    background: #fff;
    color: ${(props) => props.theme.themeDark};
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
        <div className="modal-container">{children}</div>
      </ModalStyles>
    </div>
  );
};

export default Modal;
