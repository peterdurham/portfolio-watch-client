import styled from "styled-components";

const AuthStyles = styled.div`
  button {
    border: 2px solid ${(props) => props.theme.accentBlue};
    &:hover {
      background: ${(props) => props.theme.accentBlue};
    }
  }
  .auth-option {
    margin-bottom: 10px;
  }
  .auth-register {
    margin-top: 40px;
  }
  label {
    width: 90px;
    display: inline-block;
  }
  input {
    background: ${(props) => props.theme.input};
    color: ${(props) => props.theme.textLight};
    border: none;
    outline: 1px solid ${(props) => props.theme.themeLight};
    height: 32px;
    font-size: 14px;
    padding-left: 16px;
  }
  .register-link {
    margin-bottom: 10px;
  }
  .register-link a,
  .register-link div {
    transition: all 0.3s;
    font-size: 20px;
    cursor: pointer;
  }
  .register-link a:hover,
  .register-link div:hover {
    color: ${(props) => props.theme.textDark};
  }
  .register-link span {
    color: ${(props) => props.theme.textDark};
  }
  .error-message {
    margin-top: 16px;
    color: ${(props) => props.theme.loss};
  }
`;

export { AuthStyles };
