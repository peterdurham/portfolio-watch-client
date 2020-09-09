import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Modal from "./ui/modal";
import { useQuery } from "@apollo/client";
import stocks from "../data/stocks.json";
import { getStocksQuery, updateStock } from "../graphql/portfolio";
import { fetchStockQuote } from "./api";

const Stock = () => {
  let { id } = useParams();

  const { data: portfolioData, loading: portfolioLoading } = useQuery(
    getStocksQuery
  );

  const [stockInfo, setStockInfo] = useState(null);
  const [stockQuoteData, setStockQuoteData] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [addingStock, setAddingStock] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [updatingStock, setUpdatingStock] = useState(false);
  const [updateAmount, setUpdateAmount] = useState("");

  useEffect(() => {
    const selectedStock = stocks.filter(
      (stock) => stock.symbol === id.toUpperCase()
    )[0];
    setStockInfo(selectedStock);
  }, []);

  const submitAddAsset = async (e) => {
    try {
      e.preventDefault();
      await updateStock(id, Number(addAmount));
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };
  const submitUpdateAsset = async (e) => {
    try {
      e.preventDefault();
      await updateStock(id, Number(updateAmount));
      onModalClose();
    } catch (e) {
      console.error(e);
    }
  };
  const onModalClose = () => {
    setAddAmount("");
    setAddingStock(false);
    setUpdateAmount("");
    setUpdatingStock(false);
    setShowModal(false);
  };
  const openAddStockModal = (e) => {
    setShowModal(true);
    setAddingStock(true);
  };

  const openUpdateStockModal = (e) => {
    setShowModal(true);
    setUpdatingStock(true);
  };

  if (portfolioLoading) return <div>...loading</div>;
  else {
    const stockOwned =
      portfolioData &&
      portfolioData.portfolio.stocks &&
      portfolioData.portfolio.stocks.filter((stock) => stock.symbol === id)[0];

    const amount = stockOwned ? stockOwned.amount : 0;

    return (
      <StockStyles>
        <Modal showModal={showModal} onModalClose={onModalClose}>
          {addingStock && (
            <>
              <h3>Add {stockInfo.symbol}</h3>
              <form onSubmit={submitAddAsset}>
                <label htmlFor="amount">Amount:</label>
                <input
                  id="amount"
                  type="number"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                />
                <button>Add {stockInfo.symbol}</button>
              </form>
            </>
          )}
          {updatingStock && (
            <>
              <h3>Update {stockInfo.symbol}</h3>
              <form onSubmit={submitUpdateAsset}>
                <label htmlFor="updateamount">New Amount:</label>
                <input
                  id="updateamount"
                  type="number"
                  value={updateAmount}
                  onChange={(e) => setUpdateAmount(e.target.value)}
                />
                <button>Update {stockInfo.symbol}</button>
              </form>
            </>
          )}
        </Modal>
        <StockLabel>{stockInfo && <h2>Stock: {stockInfo.name}</h2>}</StockLabel>
        <button
          onClick={async () => {
            const { data } = await fetchStockQuote(id);
            setStockQuoteData(data);
          }}
        >
          LOAD STOCK DATA
        </button>
        <StockPrice>
          <h2>Details</h2>
          <div className="price-container">
            <span className="text-dark price-label">Current Price:</span>{" "}
            {stockQuoteData && stockQuoteData.latestPrice && (
              <span id="current-price">
                ${stockQuoteData.latestPrice.toFixed(2).toLocaleString()}
              </span>
            )}
            {stockQuoteData &&
              stockQuoteData.changePercent &&
              stockQuoteData.changePercent !== 0 && (
                <span
                  className={
                    "percentage-change" +
                    (stockQuoteData.changePercent > 0 ? " gain" : " loss")
                  }
                >
                  &nbsp;({(stockQuoteData.changePercent * 100).toFixed(2)}%)
                </span>
              )}
          </div>
          {stockQuoteData && stockQuoteData.marketCap && (
            <div className="detail">
              <span className="detail-label">Previous Close:</span>
              <span className="detail-value">
                $ {stockQuoteData.previousClose.toLocaleString()}
              </span>
            </div>
          )}

          {stockQuoteData && stockQuoteData.marketCap && (
            <div className="detail">
              <span className="detail-label">Market Cap:</span>
              <span className="detail-value">
                $ {stockQuoteData.marketCap.toLocaleString()}
              </span>
            </div>
          )}
          {stockQuoteData && stockQuoteData.marketCap && (
            <div className="detail">
              <span className="detail-label">P/E ratio:</span>
              <span className="detail-value">{stockQuoteData.peRatio}</span>
            </div>
          )}
          {stockQuoteData && stockQuoteData.week52High && (
            <div className="detail">
              <span className="detail-label">52 week high:</span>
              <span className="detail-value">
                $ {stockQuoteData.week52High.toLocaleString()}
              </span>
            </div>
          )}
          {stockQuoteData && stockQuoteData.week52High && (
            <div className="detail">
              <span className="detail-label">52 week low:</span>
              <span className="detail-value">
                $ {stockQuoteData.week52Low.toLocaleString()}
              </span>
            </div>
          )}
          {stockQuoteData && stockQuoteData.ytdChange && (
            <div className="detail">
              <span className="detail-label">YTD Change:</span>
              <span
                className={
                  "detail-value" +
                  (stockQuoteData.ytdChange > 0 ? " gain" : " loss")
                }
              >
                {stockQuoteData.ytdChange.toFixed(2)}%
              </span>
            </div>
          )}
        </StockPrice>
        <StockHoldings>
          <h2>Holdings</h2>
          {stockInfo && (
            <div id="holdings-details">
              <div>{stockInfo.symbol}</div>
              <div>
                {" "}
                {stockQuoteData && amount && stockQuoteData.latestPrice ? (
                  <span>
                    ${(amount * stockQuoteData.latestPrice).toLocaleString()}
                  </span>
                ) : (
                  <span>loading</span>
                )}
              </div>
              <div>
                {amount && <span>{amount.toLocaleString()}</span>} shares
              </div>

              {amount && amount > 0 ? (
                <button onClick={openUpdateStockModal}>
                  Update {stockInfo.symbol}
                </button>
              ) : (
                <button onClick={openAddStockModal}>
                  Add {stockInfo.symbol}
                </button>
              )}
            </div>
          )}
        </StockHoldings>
      </StockStyles>
    );
  }
};

const StockStyles = styled.div``;
const StockLabel = styled.div`
  background: ${(props) => props.theme.themeLight};
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  margin-bottom: 16px;
`;

const StockPrice = styled.div`
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

const StockHoldings = styled.div`
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
    border: 2px solid ${(props) => props.theme.accentOrange};
    &:hover {
      background: ${(props) => props.theme.accentOrange};
    }
  }
`;

export default Stock;
