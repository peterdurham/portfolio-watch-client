import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { ContainerStyles } from "../../styles/containerStyles";
import { loginUser } from "../../graphql/auth";

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
      <h1 className="fade-in-up">Please log in</h1>
      <div>
        <h3>Log in:</h3>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
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
          {error && <div style={{ color: "red" }}>{error.message}</div>}
        </form>
      </div>
      <div>
        <h2>Not signed up yet?</h2>
        <Link to="/register">Register here</Link>
      </div>
    </ContainerStyles>
  );
};

export default Login;
