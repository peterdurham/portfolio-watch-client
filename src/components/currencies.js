import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ContainerStyles } from "../styles/containerStyles";
import PleaseSignIn from "./auth/pleaseSignIn";
import { currencyList } from "../data/currencyList";
import Currency from "./currency";
import Modal from "./ui/modal";
import { updateCurrency, getCurrenciesQuery } from "../graphql/portfolio";

const Currencies = () => {
  const { data: currencyData, loading: currencyLoading } = useQuery(
    getCurrenciesQuery
  );

  const [showModal, setShowModal] = useState(false);
  const [currencyToAdd, setCurrencyToAdd] = useState(null);
  const [addAmount, setAddAmount] = useState("");
  const [currencyToUpdate, setCurrencyToUpdate] = useState(null);
  const [currentAmount, setCurrentAmount] = useState(null);
  const [updateAmount, setUpdateAmount] = useState("");

  const submitAddAsset = async (e) => {
    try {
      e.preventDefault();
      await updateCurrency(currencyToAdd, Number(addAmount));
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };
  const submitUpdateAsset = async (e) => {
    try {
      e.preventDefault();
      await updateCurrency(currencyToUpdate, Number(updateAmount));
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };
  const onModalClose = () => {
    setAddAmount("");
    setCurrencyToAdd(null);
    setUpdateAmount("");
    setCurrencyToUpdate(null);
    setShowModal(false);
  };

  if (currencyLoading) return <div>...loading</div>;
  return (
    <PleaseSignIn>
      <Modal showModal={showModal} onModalClose={onModalClose}>
        {currencyToAdd && (
          <>
            <p>Add {currencyToAdd}</p>
            <form onSubmit={submitAddAsset}>
              <label htmlFor="amount">Amount:</label>
              <input
                id="amount"
                type="number"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
              />
              <button>Add {currencyToAdd}</button>
            </form>
          </>
        )}
        {currencyToUpdate && (
          <>
            <p>Update {currencyToUpdate}</p>
            <p>Current Amount: {currentAmount}</p>
            <form onSubmit={submitUpdateAsset}>
              <label htmlFor="updateamount">New Amount:</label>
              <input
                id="updateamount"
                type="number"
                value={updateAmount}
                onChange={(e) => setUpdateAmount(e.target.value)}
              />
              <button>Update {currencyToUpdate}</button>
            </form>
          </>
        )}
      </Modal>
      <ContainerStyles>
        <h1 className="fade-in-up">Currencies go here</h1>
      </ContainerStyles>
      {currencyData && currencyData.portfolio && (
        <ContainerStyles>
          <div>
            {currencyList.map((currency) => {
              const assetOwned = currencyData.portfolio.currencies.filter(
                (item) => item.symbol === currency.symbol
              )[0];
              const amount = assetOwned ? assetOwned.amount : 0;

              return (
                <Currency
                  key={currency.symbol}
                  image={currency.image}
                  symbol={currency.symbol}
                  name={currency.name}
                  amount={amount}
                  setShowModal={setShowModal}
                  setCurrencyToAdd={setCurrencyToAdd}
                  setCurrentAmount={setCurrentAmount}
                  setCurrencyToUpdate={setCurrencyToUpdate}
                />
              );
            })}
          </div>
        </ContainerStyles>
      )}
    </PleaseSignIn>
  );
};

export default Currencies;
