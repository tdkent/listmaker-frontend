import RegisterUser from "../components/auth/RegisterUser";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <h2>User Registration</h2>
      <RegisterUser />
      <p>
        <Link to="/user-auth/login">Log in to your account</Link>
      </p>
    </div>
  );
};

export default Register;
