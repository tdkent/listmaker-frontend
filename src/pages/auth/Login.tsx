import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import LoginForm from "../../components/auth/LoginForm";

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
    <div>
      <h2>User Login</h2>
      <div>
        <LoginForm />
        <p>
          <Link to="/register">Create new account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
