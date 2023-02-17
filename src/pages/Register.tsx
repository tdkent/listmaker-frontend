import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import AuthRegister from "../components/AuthRegister";

const Register = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/lists");
    }
  }, [auth.isLoggedIn]);

  return (
    <div>
      <h2>User Registration</h2>
      <AuthRegister />
      <p>
        <Link to="/user-auth/login">Log in to your account</Link>
      </p>
    </div>
  );
};

export default Register;
