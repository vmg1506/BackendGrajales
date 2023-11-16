import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm.js";
import RegisterForm from "../components/RegisterForm.js";

const ProfileContainer = ({type}) => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const isLogin = type === "login";

    useEffect(() => {
        if(user) {
          return navigate(`/products`);
        }
      }, [navigate, user]);

    return <>
        <h1>Perfil</h1>
        {isLogin ? <LoginForm /> : <RegisterForm />}
    </>
}

export default ProfileContainer;