export async function fetchStockQuote(symbol) {
  const API_KEY = process.env.REACT_APP_IEX_KEY;
  const url =
    "https://cloud.iexapis.com/stable/stock/" +
    symbol.toLowerCase() +
    "/quote?token=" +
    API_KEY;

  return await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((parsed) => {
      return { data: parsed };
      // return { data: { latestPrice: parsed.latestPrice.toFixed(2) } };
    });
}

export async function fetchCryptoQuote(id) {
  const url = "https://api.coingecko.com/api/v3/coins/" + id.toLowerCase();

  return await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((parsed) => {
      return { data: parsed };
      // return { data: { latestPrice: parsed.latestPrice.toFixed(2) } };
    });
}

export function getRecentStocks() {
  const loadingJSON = localStorage.getItem("recentstocks");
  const storedRecentStocks = JSON.parse(loadingJSON);
  return storedRecentStocks;
}

export function updateRecentStocks(symbol, name) {
  const loadingJSON = localStorage.getItem("recentstocks");
  const storedRecentStocks = JSON.parse(loadingJSON);

  let recentStocks = [];

  if (storedRecentStocks) {
    const checkForDuplicate = storedRecentStocks.filter(
      (item) => item.symbol === symbol
    );

    if (checkForDuplicate.length === 0) {
      recentStocks = storedRecentStocks;
      recentStocks.push({ symbol, name });

      if (storedRecentStocks.length > 5) {
        recentStocks.shift();
      }
    } else {
      recentStocks = storedRecentStocks;
    }
  } else {
    recentStocks.push({ symbol, name });
  }

  const savingJSON = JSON.stringify(recentStocks);
  localStorage.setItem("recentstocks", savingJSON);
}

export function getRecentCryptos() {
  const loadingJSON = localStorage.getItem("recentcryptos");
  const storedRecentCryptos = JSON.parse(loadingJSON);
  return storedRecentCryptos;
}

export function updateRecentCryptos(id, name, symbol) {
  const loadingJSON = localStorage.getItem("recentcryptos");
  const storedRecentCryptos = JSON.parse(loadingJSON);

  let recentCryptos = [];

  if (storedRecentCryptos) {
    const checkForDuplicate = storedRecentCryptos.filter(
      (item) => item.id === id
    );

    if (checkForDuplicate.length === 0) {
      recentCryptos = storedRecentCryptos;
      recentCryptos.push({ id, name, symbol });

      if (storedRecentCryptos.length > 5) {
        recentCryptos.shift();
      }
    } else {
      recentCryptos = storedRecentCryptos;
    }
  } else {
    recentCryptos.push({ id, name, symbol });
  }

  const savingJSON = JSON.stringify(recentCryptos);
  localStorage.setItem("recentcryptos", savingJSON);
}
