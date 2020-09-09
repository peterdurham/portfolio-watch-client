import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { ContainerStyles } from "../styles/containerStyles";
import PleaseSignIn from "./auth/pleaseSignIn";
import { portfolioQuery } from "../graphql/portfolio";
import { currencyList } from "../data/currencyList";

const Portfolio = () => {
  const { data, loading } = useQuery(portfolioQuery);

  if (loading) return <div>...loading</div>;
  return (
    <PleaseSignIn>
      <ContainerStyles>
        <h1 className="fade-in-up">Portfolio </h1>
      </ContainerStyles>
      {data && data.portfolio.stocks.length > 0 && (
        <ContainerStyles>
          <>
            <h2>
              <Link to="/stocks" className="stocks-label">
                Stocks
              </Link>
            </h2>
            {data.portfolio.stocks.map((stock) => (
              <div key={stock.symbol} className="listing">
                <Link to={`/stocks/${stock.symbol}`}>
                  <div className="listing-symbol-link">
                    {stock.symbol.toUpperCase()}
                  </div>{" "}
                </Link>
                <div className="listing-amount">
                  {stock.amount.toLocaleString()} shares
                </div>
              </div>
            ))}
          </>
        </ContainerStyles>
      )}
      {data && data.portfolio.cryptos.length > 0 && (
        <ContainerStyles>
          <>
            <h2 id="cryptos-header">
              <Link to="/cryptos" className="cryptos-label">
                Cryptos
              </Link>
            </h2>
            {data.portfolio.cryptos.map((crypto) => (
              <div key={crypto.symbol} className="listing">
                <Link to={`/cryptos/${crypto.symbol}`}>
                  <div className="listing-symbol-link">
                    {crypto.symbol.toUpperCase()}
                  </div>{" "}
                </Link>
                <div className="listing-amount">
                  {crypto.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </>
        </ContainerStyles>
      )}
      {data && data.portfolio.currencies.length > 0 && (
        <ContainerStyles>
          <>
            <h2 id="currencies-header">
              <Link to="/currencies" className="currencies-label">
                Currencies
              </Link>
            </h2>
            {data.portfolio.currencies.map((currency) => {
              const signList = currencyList.filter(
                (item) => item.symbol === currency.symbol
              )[0];

              return (
                <div key={currency.symbol} className="listing">
                  <div className="listing-symbol">{currency.symbol}</div>{" "}
                  <div className="listing-amount">
                    {signList.sign}&nbsp;
                    {currency.amount.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </>
        </ContainerStyles>
      )}
      {data &&
        data.portfolio.currencies.length === 0 &&
        data.portfolio.cryptos.length === 0 &&
        data.portfolio.stocks.length === 0 && (
          <ContainerStyles>
            <h3>No Assets yet added</h3>
          </ContainerStyles>
        )}
    </PleaseSignIn>
  );
};

export default Portfolio;
