import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import { ContainerStyles } from "../styles/containerStyles";
import { LookupStyles } from "../styles/lookupStyles";
import PleaseSignIn from "./auth/pleaseSignIn";

import { shortenName } from "../utils/shortenName";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getRecentStocks, updateRecentStocks } from "./api";
import stocks from "../data/stocks.json";

const Stocks = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [recentStocks, setRecentStocks] = useState([]);

  useEffect(() => {
    const recent = getRecentStocks();
    setRecentStocks(recent);
  }, []);

  const handleChange = (input) => {
    const newFiltered = stocks.filter((item) => {
      return (
        item.symbol.toLowerCase().startsWith(input.toLowerCase()) ||
        item.name.toLowerCase().startsWith(input.toLowerCase())
      );
    });
    setFilteredStocks(newFiltered);
    setSearchText(input);
  };

  return (
    <PleaseSignIn>
      <ContainerStyles>
        <h1 className="fade-in-up">
          <span className="stocks-label">Stocks</span>
        </h1>
      </ContainerStyles>
      <ContainerStyles>
        <h2>
          <span className="stocks-label">Stock</span> Lookup
        </h2>

        <LookupStyles>
          <>
            <div className="input-container">
              <input
                type="text"
                id="search"
                placeholder="Search..."
                autoComplete="off"
                value={searchText}
                onChange={(e) => handleChange(e.target.value)}
              />
              {searchText.length > 0 && (
                <button
                  className="close-button"
                  onClick={() => setSearchText("")}
                >
                  <AiOutlineCloseCircle />
                </button>
              )}
            </div>
            {searchText.length > 0 && (
              <div id="dropdown">
                {filteredStocks.map((stock) => (
                  <div
                    onClick={() => {
                      updateRecentStocks(
                        stock.symbol.toLowerCase(),
                        stock.name
                      );
                      history.push("/stocks/" + stock.symbol.toLowerCase());
                    }}
                    key={stock.name}
                  >
                    <div className="dropdown-item">
                      <span className="dropdown-symbol">{stock.symbol}</span>{" "}
                      <span className="dropdown-name">
                        {shortenName(stock.name)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        </LookupStyles>
      </ContainerStyles>
      {recentStocks && (
        <ContainerStyles>
          <h2>
            Recent <span className="stocks-label">Stock</span> Searches
          </h2>
          {recentStocks.map((stock) => (
            <div key={stock.symbol} className="listing">
              <Link to={`/stocks/${stock.symbol.toLowerCase()}`}>
                <div className="listing-symbol-link">
                  {stock.symbol.toUpperCase()}
                </div>{" "}
              </Link>
              <div>{stock.name}</div>
            </div>
          ))}
        </ContainerStyles>
      )}
    </PleaseSignIn>
  );
};

export default Stocks;
