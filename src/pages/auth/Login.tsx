import { Link } from "react-router-dom";

import LoginUser from "../../components/auth/LoginUser";

const Login = () => {
  return (
    <div>
      <h2>User Login</h2>
      <div>
        <LoginUser />
        <p>
          <Link to="/user-auth/register">Create new account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
