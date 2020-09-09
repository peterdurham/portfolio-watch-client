import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import { ContainerStyles } from "../styles/containerStyles";
import { LookupStyles } from "../styles/lookupStyles";
import PleaseSignIn from "./auth/pleaseSignIn";

import { shortenName } from "../utils/shortenName";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getRecentCryptos, updateRecentCryptos } from "./api";
import cryptos from "../data/cryptos.json";

const Cryptos = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [recentCryptos, setRecentCryptos] = useState([]);

  useEffect(() => {
    const recent = getRecentCryptos();
    setRecentCryptos(recent);
  }, []);

  const handleChange = (input) => {
    const newFiltered = cryptos.filter((item) => {
      return (
        item.symbol.toLowerCase().startsWith(input.toLowerCase()) ||
        item.name.toLowerCase().startsWith(input.toLowerCase())
      );
    });
    setFilteredCryptos(newFiltered);
    setSearchText(input);
  };

  return (
    <PleaseSignIn>
      <ContainerStyles>
        <h1 className="fade-in-up">
          <span className="cryptos-label">Cryptos</span>
        </h1>
      </ContainerStyles>
      <ContainerStyles>
        <h2>
          {" "}
          <span className="cryptos-label">Crypto</span> Lookup
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
                {filteredCryptos.map((crypto) => (
                  <div
                    onClick={() => {
                      updateRecentCryptos(
                        crypto.id.toLowerCase(),
                        crypto.name,
                        crypto.symbol
                      );
                      history.push("/cryptos/" + crypto.id.toLowerCase());
                    }}
                    key={crypto.name}
                  >
                    <div className="dropdown-item">
                      <span className="dropdown-symbol">
                        {crypto.symbol.toUpperCase()}
                      </span>{" "}
                      <span className="dropdown-name">
                        {shortenName(crypto.name)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        </LookupStyles>
      </ContainerStyles>
      {recentCryptos && (
        <ContainerStyles>
          <h2>
            Recent <span className="cryptos-label">Crypto</span> Searches
          </h2>
          <>
            {recentCryptos.map((crypto) => (
              <div key={crypto.id} className="listing">
                <Link to={`/cryptos/${crypto.id}`}>
                  <div className="listing-symbol-link">
                    {crypto.symbol.toUpperCase()}
                  </div>{" "}
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

export default Cryptos;
