import styled from "styled-components";

export const LookupStyles = styled.div`
  background: ${(props) => props.theme.themeMedium};
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 8px;
  @media (max-width: 580px) {
    padding: 0px;
  }
  h3 {
    margin-bottom: 8px;
  }
  .input-container {
    position: relative;
    width: 450px;
    @media (max-width: 840px) {
      width: 400px;
    }
    @media (max-width: 540px) {
      width: 100%;
    }
  }
  input {
    background: ${(props) => props.theme.input};
    color: ${(props) => props.theme.textLight};
    border: none;
    height: 32px;
    font-size: 14px;
    padding-left: 16px;
    width: 100%;
  }
  input:active,
  input:focus {
    outline: 1px solid ${(props) => props.theme.textDark};
  }
  .close-button {
    position: absolute;
    top: 4px;
    right: 6px;
    border: none;
    padding: 0;
  }
  .close-button:active {
    outline: 0;
  }
  .close-button svg {
    font-size: 24px;
  }
  .close-button svg:hover {
    color: ${(props) => props.theme.textDark};
  }
  #dropdown {
    margin-top: 1px;
    padding: 8px 16px;
    width: 450px;
    max-height: 254px;
    overflow-y: scroll;
    background: ${(props) => props.theme.themeLight};
    @media (max-width: 840px) {
      width: 400px;
    }
    @media (max-width: 540px) {
      width: 100%;
      padding: 8px;
    }
  }
  .dropdown-item {
    color: ${(props) => props.theme.textDark};
    padding: 4px 8px;
    cursor: pointer;
    &:hover {
      background: ${(props) => props.theme.input};
    }
    @media (max-width: 580px) {
      font-size: 12px;
    }
  }
  .dropdown-symbol {
    color: ${(props) => props.theme.textLight};
    width: 102px;
    display: inline-block;
    @media (max-width: 580px) {
      width: 72px;
    }
  }
  .dropdown-name {
  }
`;
