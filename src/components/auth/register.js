import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ContainerStyles } from "../../styles/containerStyles";
import { AuthStyles } from "../../styles/authStyles";
import { registerUser } from "../../graphql/auth";

const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, username, password);
      history.push("/");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <ContainerStyles>
      <AuthStyles>
        <h2 className="fade-in-up">Sign up</h2>

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
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
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
          <button type="submit">Register</button>
          {error && <div className="error-message">{error.message}</div>}
        </form>
      </AuthStyles>
    </ContainerStyles>
  );
};

export default Register;
