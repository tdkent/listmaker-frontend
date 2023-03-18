import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import RegisterForm from "../../components/auth/RegisterForm";

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
      <h2>User Registration</h2>
      <RegisterForm />
      <p>
        <Link to="/user-auth/login">Log in to your account</Link>
      </p>
    </div>
  );
};

export default Register;
