import React from "react";
import styled from "styled-components";

import USD from "../images/currencies/usd.jpg";
import EURO from "../images/currencies/euro.jpg";
import JPY from "../images/currencies/jpy.jpg";
import GBP from "../images/currencies/gbp.jpg";
import AUD from "../images/currencies/aud.jpg";
import CAD from "../images/currencies/cad.jpg";
import CHF from "../images/currencies/chf.jpg";
import NZD from "../images/currencies/nzd.jpg";

const Currency = ({
  image,
  symbol,
  name,
  sign,
  amount,
  setShowModal,
  setCurrencyToAdd,
  setCurrencyToUpdate,
  setCurrentAmount,
}) => {
  let currencyImage;
  if (symbol === "USD") currencyImage = <img src={USD} alt="US dollar" />;
  else if (symbol === "EURO") currencyImage = <img src={EURO} alt="Euro" />;
  else if (symbol === "JPY")
    currencyImage = <img src={JPY} alt="Japanese Yen" />;
  else if (symbol === "GBP")
    currencyImage = <img src={GBP} alt="British Pound" />;
  else if (symbol === "AUD")
    currencyImage = <img src={AUD} alt="Austrailian Dollar" />;
  else if (symbol === "CAD")
    currencyImage = <img src={CAD} alt="Canadian Dollar" />;
  else if (symbol === "CHF")
    currencyImage = <img src={CHF} alt="Swiss Franc" />;
  else if (symbol === "NZD")
    currencyImage = <img src={NZD} alt="New Zealand Dollar" />;

  const openAddCurrencyModal = (e) => {
    setShowModal(true);
    setCurrencyToAdd(symbol);
  };

  const openUpdateCurrencyModal = (e) => {
    setShowModal(true);
    setCurrentAmount(amount);
    setCurrencyToUpdate(symbol);
  };

  return (
    <CurrencyStyles>
      <div className="currency-image">{currencyImage}</div>
      <div className="currency-symbol">{symbol}</div>
      <div className="currency-name">{name}</div>
      <div className="currency-amount">
        {sign}&nbsp;
        {Number(amount).toLocaleString()}
      </div>

      <div className="currency-action">
        {amount > 0 ? (
          <button onClick={openUpdateCurrencyModal}>Update {symbol}</button>
        ) : (
          <button onClick={openAddCurrencyModal}>Add {symbol}</button>
        )}
      </div>
    </CurrencyStyles>
  );
};

const CurrencyStyles = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding-bottom: 10px;

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.textDark};
  }

  .currency-image {
    flex-basis: 15%;
    @media (max-width: 580px) {
      flex-basis: 25%;
    }
  }
  .currency-symbol {
    flex-basis: 15%;
    @media (max-width: 580px) {
      flex-basis: 30%;
    }
  }
  .currency-name {
    flex-basis: 40%;
    @media (max-width: 1100px) {
      flex-basis: 25%;
    }
    @media (max-width: 580px) {
      display: none;
      flex-basis: 0%;
    }
  }
  .currency-amount {
    flex-basis: 15%;
    font-weight: 700;
    font-size: 20px;
    @media (max-width: 580px) {
      flex-basis: 25%;
    }
  }
  .currency-action {
    flex-basis: 15%;
    text-align: right;
    margin-right: 40px;
    @media (max-width: 1100px) {
      flex-basis: 30%;
    }
    @media (max-width: 580px) {
      font-size: 12px;
      flex-basis: 20%;
      margin-right: 0px;
    }
  }
  .currency-action button {
    border: 2px solid ${(props) => props.theme.accentGreen};
    &:hover {
      background: ${(props) => props.theme.accentGreen};
    }
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 40px;
    @media (max-width: 1100px) {
      margin-left: 0px;
      width: 36px;
      height: 36px;
    }
  }
  div {
    flex-basis: 20%;
  }
`;
export default Currency;
