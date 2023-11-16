import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.js";

const Welcome = ({ user }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <div className="welcome-products-user">
      <h2>Welcome {user?.name}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Welcome;