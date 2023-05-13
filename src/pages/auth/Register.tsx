import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import RegisterForm from "../../components/auth/RegisterForm";
import Hyperlink from "../../components/forms/Hyperlink";

const Register = () => {
  // auth check
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/lists");
    }
  }, [auth.isLoggedIn, navigate]);

  return (
    <div>
      <h2>Create a free account</h2>
      <RegisterForm />
      <p className="mb-6 pl-1">
        Already have an account? <Hyperlink to="/login">Log in</Hyperlink>
      </p>
    </div>
  );
};

export default Register;
