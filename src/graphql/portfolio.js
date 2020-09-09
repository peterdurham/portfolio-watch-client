import { gql } from "@apollo/client";
import client from "./client";

export const portfolioQuery = gql`
  query portfolio {
    portfolio {
      user
      stocks {
        symbol
        amount
      }
      cryptos {
        symbol
        amount
      }
      currencies {
        symbol
        amount
      }
    }
  }
`;

export const getCurrenciesQuery = gql`
  query getCurrencies {
    portfolio {
      user
      currencies {
        symbol
        amount
      }
    }
  }
`;

export const getStocksQuery = gql`
  query getStocks {
    portfolio {
      user
      stocks {
        symbol
        amount
      }
    }
  }
`;

export const getCryptosQuery = gql`
  query getCryptos {
    portfolio {
      user
      cryptos {
        symbol
        amount
      }
    }
  }
`;

const updateCurrencyMutation = gql`
  mutation updateCurrency($symbol: String, $amount: Float) {
    updateCurrency(symbol: $symbol, amount: $amount) {
      user
      currencies {
        symbol
        amount
      }
    }
  }
`;

export async function updateCurrency(symbol, amount) {
  const { data } = await client.mutate({
    mutation: updateCurrencyMutation,
    variables: { symbol, amount },
    refetchQueries: [
      {
        query: getCurrenciesQuery,
      },
    ],
  });
  return data;
}

const updateStockMutation = gql`
  mutation updateStock($symbol: String, $amount: Float) {
    updateStock(symbol: $symbol, amount: $amount) {
      user
      stocks {
        symbol
        amount
      }
    }
  }
`;

export async function updateStock(symbol, amount) {
  const { data } = await client.mutate({
    mutation: updateStockMutation,
    variables: { symbol, amount },
    refetchQueries: [
      {
        query: getStocksQuery,
      },
    ],
  });
  return data;
}

const updateCryptoMutation = gql`
  mutation updateCrypto($symbol: String, $amount: Float) {
    updateCrypto(symbol: $symbol, amount: $amount) {
      user
      cryptos {
        symbol
        amount
      }
    }
  }
`;

export async function updateCrypto(symbol, amount) {
  const { data } = await client.mutate({
    mutation: updateCryptoMutation,
    variables: { symbol, amount },
    refetchQueries: [
      {
        query: getCryptosQuery,
      },
    ],
  });
  return data;
}
