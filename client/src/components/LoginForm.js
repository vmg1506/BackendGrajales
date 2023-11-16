import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.js";

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      login(email, password);
    };

    return <>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleLogin}>
          <label>
          Email::
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
      <p>Do you already have an account?, <a href="/register">Click Here</a></p>
    </>
}

export default LoginForm;