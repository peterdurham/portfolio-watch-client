import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ContainerStyles } from "../../styles/containerStyles";
import { registerUser } from "../../graphql/auth";

const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      history.push("/");
    } catch (error) {
      setError(error);
    }
  };
  return (
    <ContainerStyles>
      <h1 className="fade-in-up">Signup go here</h1>

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
        <button type="submit">Register</button>
        {error && <div style={{ color: "red" }}>{error.message}</div>}
      </form>
    </ContainerStyles>
  );
};

export default Register;
