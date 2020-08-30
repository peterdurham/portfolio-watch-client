import { gql } from "@apollo/client";
import client from "./client";

const accessTokenKey = "accessToken";

export function getAccessToken() {
  return localStorage.getItem(accessTokenKey);
}
export function isLoggedIn() {
  return !!localStorage.getItem(accessTokenKey);
}

export function logoutUser() {
  localStorage.removeItem(accessTokenKey);
}

export const getUserQuery = gql`
  query GetUser {
    getUser {
      id
      email
    }
  }
`;

const loginUserMutation = gql`
  mutation LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;
const registerUserMutation = gql`
  mutation RegisterUser($email: String, $password: String) {
    registerUser(email: $email, password: $password) {
      token
    }
  }
`;

export async function getUser() {
  const { data } = await client.query({
    query: getUserQuery,
  });
  return data.getUser;
}

export async function loginUser(email, password) {
  const { data } = await client.mutate({
    mutation: loginUserMutation,
    variables: { email, password },
  });
  localStorage.setItem(accessTokenKey, data.loginUser.token);
  return data.token;
}
export async function registerUser(email, password) {
  const { data } = await client.mutate({
    mutation: registerUserMutation,
    variables: { email, password },
  });
  localStorage.setItem(accessTokenKey, data.registerUser.token);
  return data.token;
}
