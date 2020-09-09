import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { ContainerStyles } from "../../styles/containerStyles";
import { AuthStyles } from "../../styles/authStyles";
import { loginUser, registerGuest } from "../../graphql/auth";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      history.push("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <ContainerStyles>
      <AuthStyles>
        <div>
          <h2>Welcome to Portfolio Watch</h2>
          <WelcomeTextStyles>
            Sign up below to tracking your portfolio for stocks, cryptos, and
            currencies.
          </WelcomeTextStyles>{" "}
          <WelcomeTextStyles>
            Try out the application as a guest, or register with your email.
          </WelcomeTextStyles>
          <LoginHeader className="fade-in-up">Log in:</LoginHeader>
          <form onSubmit={onSubmit}>
            <div className="auth-option">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="auth-option">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button type="submit">Login</button>
            {error && <div className="error-message">{error.message}</div>}
          </form>
        </div>
        <div className="auth-register">
          <h2>Not signed up yet?</h2>{" "}
          <div className="register-link">
            <Link to="/register">
              <span>&gt;&gt;</span> Sign up here
            </Link>
          </div>
          <div className="register-link">
            <div
              onClick={async () => {
                await registerGuest();
                history.push("/");
              }}
            >
              <span>&gt;&gt;</span> Continue as guest
            </div>
          </div>
        </div>
      </AuthStyles>
    </ContainerStyles>
  );
};
const WelcomeTextStyles = styled.p`
  width: 360px;
  color: ${(props) => props.theme.textMedium};
  font-size: 18px;
  padding-left: 20px;
  padding-bottom: 20px;
  @media (max-width: 800px) {
    padding-left: 0px;
    width: 100%;
  }
`;
const LoginHeader = styled.h2`
  margin-top: 20px;
`;

export default Login;
