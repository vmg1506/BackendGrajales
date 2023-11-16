import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const { register } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();
  
    const handleRegister = async (e) => {
      e.preventDefault();
      await register(first_name, last_name, email, age, password);
      navigate(`/login`)
    };
  
    return <>
        <h2>Registration</h2>
        <div>
        <form onSubmit={handleRegister}>
          <label>
            Name:
            <input
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
          <button type="submit">Done!</button>
        </form>
      </div>
      <p>you have an account?, <a href="/login">click Here</a></p>
      </>
    ;
}

export default RegisterForm;