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
