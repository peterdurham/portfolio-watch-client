import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContainerStyles } from "../styles/containerStyles";
import PleaseSignIn from "./auth/pleaseSignIn";
import { useQuery } from "@apollo/client";
import { getUserQuery } from "../graphql/auth";
import { getRecentStocks, getRecentCryptos } from "./api";

const Dashboard = () => {
  const { data, loading } = useQuery(getUserQuery);
  const [recentStocks, setRecentStocks] = useState([]);
  const [recentCryptos, setRecentCryptos] = useState([]);

  useEffect(() => {
    setRecentStocks(getRecentStocks());
    setRecentCryptos(getRecentCryptos());
  }, []);

  if (loading) return <div>...loading</div>;

  return (
    <PleaseSignIn>
      <ContainerStyles>
        <h1 className="fade-in-up">Dashboard</h1>
      </ContainerStyles>
      <ContainerStyles>
        <p>
          Logged in as:{" "}
          <span className="bold">
            {data && data.getUser && data.getUser.username}
          </span>
        </p>
      </ContainerStyles>
      {recentStocks && (
        <ContainerStyles>
          <h2>
            Recent <span className="stocks-label">Stock</span> Searches
          </h2>
          {recentStocks.map((stock) => (
            <div key={stock.symbol} className="listing">
              <Link to={`/stocks/${stock.symbol.toLowerCase()}`}>
                <div className="listing-symbol">
                  {stock.symbol.toUpperCase()}:
                </div>{" "}
              </Link>
              <div>{stock.name}</div>
            </div>
          ))}
        </ContainerStyles>
      )}
      {recentCryptos && (
        <ContainerStyles>
          <h2>
            Recent <span className="cryptos-label">Crypto</span> Searches
          </h2>
          <>
            {recentCryptos.map((crypto) => (
              <div key={crypto.id} className="listing">
                <Link to={`/cryptos/${crypto.id}`}>
                  <div className="listing-symbol">
                    {crypto.symbol.toUpperCase()}:
                  </div>
                </Link>
                <div>{crypto.name}</div>
              </div>
            ))}
          </>
        </ContainerStyles>
      )}
    </PleaseSignIn>
  );
};

export default Dashboard;
