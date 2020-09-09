import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Modal from "./ui/modal";
import { useQuery } from "@apollo/client";
import cryptos from "../data/cryptos.json";
import { getCryptosQuery, updateCrypto } from "../graphql/portfolio";
import { fetchCryptoQuote } from "./api";

const Crypto = () => {
  let { id } = useParams();

  const { data: portfolioData, loading: portfolioLoading } = useQuery(
    getCryptosQuery
  );

  const [cryptoInfo, setCryptoInfo] = useState(null);
  const [cryptoQuoteData, setCryptoQuoteData] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [addingCrypto, setAddingCrypto] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [updatingCrypto, setUpdatingCrypto] = useState(false);
  const [updateAmount, setUpdateAmount] = useState("");

  useEffect(() => {
    const selectedCrypto = cryptos.filter((crypto) => crypto.id === id)[0];
    setCryptoInfo(selectedCrypto);
  }, []);

  const submitAddAsset = async (e) => {
    try {
      e.preventDefault();
      await updateCrypto(id, Number(addAmount));
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };
  const submitUpdateAsset = async (e) => {
    try {
      e.preventDefault();
      await updateCrypto(id, Number(updateAmount));
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };
  const onModalClose = () => {
    setAddAmount("");
    setAddingCrypto(false);
    setUpdateAmount("");
    setUpdatingCrypto(false);
    setShowModal(false);
  };
  const openAddCryptoModal = (e) => {
    setShowModal(true);
    setAddingCrypto(true);
  };

  const openUpdateCryptoModal = (e) => {
    setShowModal(true);
    setUpdatingCrypto(true);
  };

  if (portfolioLoading) return <div>...loading</div>;
  else {
    const cryptoOwned =
      portfolioData &&
      portfolioData.portfolio.cryptos &&
      portfolioData.portfolio.cryptos.filter(
        (crypto) => crypto.symbol === id
      )[0];

    const amount = cryptoOwned ? cryptoOwned.amount : 0;

    return (
      <CryptoStyles>
        <Modal showModal={showModal} onModalClose={onModalClose}>
          {addingCrypto && (
            <>
              <h3>Add {cryptoInfo.symbol}</h3>
              <form onSubmit={submitAddAsset}>
                <label htmlFor="amount">Amount:</label>
                <input
                  id="amount"
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                />
                <button>Add {cryptoInfo.symbol}</button>
              </form>
            </>
          )}
          {updatingCrypto && (
            <>
              <h3>Update {cryptoInfo.symbol.toUpperCase()}</h3>

              <form onSubmit={submitUpdateAsset}>
                <label htmlFor="updateamount">New Amount:</label>
                <input
                  id="updateamount"
                  type="number"
                  value={updateAmount}
                  onChange={(e) => setUpdateAmount(e.target.value)}
                />
                <button>Update {cryptoInfo.symbol}</button>
              </form>
            </>
          )}
        </Modal>
        <CryptoLabel>
          {cryptoInfo && <h2>Crypto: {cryptoInfo.name}</h2>}
        </CryptoLabel>
        <button
          onClick={async () => {
            const { data } = await fetchCryptoQuote(id);
            setCryptoQuoteData(data);
          }}
        >
          LOAD CRYPTO DATA
        </button>
        <CryptoPrice>
          <h2>Details</h2>
          <div className="price-container">
            <span className="text-dark price-label">Current Price:</span>{" "}
            {cryptoQuoteData && cryptoQuoteData.market_data && (
              <span id="current-price">
                $
                {cryptoQuoteData.market_data.current_price.usd
                  .toFixed(2)
                  .toLocaleString()}
              </span>
            )}
          </div>

          {cryptoQuoteData && cryptoQuoteData.market_data && (
            <div className="detail">
              <span className="detail-label">Market Cap:</span>{" "}
              <span className="detail-value">
                $ {cryptoQuoteData.market_data.market_cap.usd.toLocaleString()}
              </span>
            </div>
          )}
          {cryptoQuoteData && cryptoQuoteData.market_data && (
            <div className="detail">
              <span className="detail-label">Total Amount:</span>{" "}
              <span className="detail-value">
                {cryptoQuoteData.market_data.circulating_supply.toLocaleString()}
              </span>
            </div>
          )}
          {cryptoQuoteData && cryptoQuoteData.market_data && (
            <div className="detail">
              <span className="detail-label">Max Supply:</span>{" "}
              {cryptoQuoteData.market_data.max_supply && (
                <span className="detail-value">
                  {cryptoQuoteData.market_data.max_supply.toLocaleString()}
                </span>
              )}
            </div>
          )}
          {cryptoQuoteData && cryptoQuoteData.market_data && (
            <div className="detail">
              <span className="detail-label">All time high:</span>{" "}
              <span className="detail-value">
                $ {cryptoQuoteData.market_data.ath.usd.toLocaleString()}
              </span>
            </div>
          )}
        </CryptoPrice>
        <CryptoHoldings>
          <h2>Holdings</h2>
          {cryptoInfo && (
            <div id="holdings-details">
              <div>{cryptoInfo.symbol.toUpperCase()}</div>
              <div>
                {" "}
                {cryptoQuoteData && amount && cryptoQuoteData.market_data ? (
                  <span>
                    $&nbsp;
                    {(
                      amount * cryptoQuoteData.market_data.current_price.usd
                    ).toLocaleString()}
                  </span>
                ) : (
                  <span>$ 0</span>
                )}
              </div>
              <div>
                {amount && (
                  <span>
                    {amount.toFixed(2)} {cryptoInfo.symbol.toUpperCase()}
                  </span>
                )}
              </div>

              {amount && amount > 0 ? (
                <button onClick={openUpdateCryptoModal}>
                  Update {cryptoInfo.symbol.toUpperCase()}
                </button>
              ) : (
                <button onClick={openAddCryptoModal}>
                  Add {cryptoInfo.symbol.toUpperCase()}
                </button>
              )}
            </div>
          )}
        </CryptoHoldings>
      </CryptoStyles>
    );
  }
};

const CryptoStyles = styled.div``;
const CryptoLabel = styled.div`
  background: ${(props) => props.theme.themeLight};
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 16px;
`;

const CryptoPrice = styled.div`
  background: ${(props) => props.theme.themeLight};
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 16px;
  width: 100%;
  margin-left: auto;
  .price-container {
    margin-bottom: 16px;
  }
  .price-label {
    width: 62px;
    display: inline-block;
    text-align: right;
    margin-right: 8px;
  }
  #current-price {
    font-size: 36px;
    font-weight: 700;
  }
  .percentage-change {
    font-size: 24px;
    margin-left: 4px;
  }
  .detail {
    font-size: 20px;
    margin: 8px 0;
  }
  .detail-label {
    display: inline-block;
    width: 160px;
  }
  .detail-value {
    font-weight: 700;
  }
`;

const CryptoHoldings = styled.div`
  background: ${(props) => props.theme.themeLight};
  padding: 16px;
  border-radius: 16px;
  width: 100%;

  #holdings-details {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
  }
  #holdings-details button {
    border: 2px solid ${(props) => props.theme.accentPurple};
    &:hover {
      background: ${(props) => props.theme.accentPurple};
    }
  }
`;

export default Crypto;
