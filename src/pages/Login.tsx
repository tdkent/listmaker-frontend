import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import LoginUser from "../components/AuthLogin";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/lists");
    }
  }, [auth.isLoggedIn]);

  return (
    <div>
      <h2>User Login</h2>
      <div>
        <LoginUser />
        <p>I forgot my password</p>
        <p>
          <Link to="/register">Create new account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
