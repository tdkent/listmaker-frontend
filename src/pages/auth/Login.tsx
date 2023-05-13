import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import LoginForm from "../../components/auth/LoginForm";
import Hyperlink from "../../components/forms/Hyperlink";

const Login = () => {
  // auth check
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/lists");
    }
  }, [auth.isLoggedIn, navigate]);

  return (
    <section>
      <h2>Log in to ListMaker</h2>
      <LoginForm />
      <p className="pl-1">
        Don't have an account? <Hyperlink to="/register">Sign up for free</Hyperlink>
      </p>
    </section>
  );
};

export default Login;
