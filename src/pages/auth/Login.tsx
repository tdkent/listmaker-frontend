import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h2>User Login</h2>
      <p>
        <Link to="/user-auth/register">Create new account</Link>
      </p>
    </div>
  );
};

export default Login;
