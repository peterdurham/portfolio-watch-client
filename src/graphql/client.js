import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { isLoggedIn, getAccessToken } from "./auth";

const endpointURL = "http://localhost:4444/graphql";

const httpLink = createHttpLink({
  uri: endpointURL,
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: { query: { fetchPolicy: "no-cache" } },
});

export default client;
