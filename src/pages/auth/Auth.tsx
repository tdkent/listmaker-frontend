// import AuthenticateUser from "../../components/auth/AuthenticateUser";
import RegisterUser from "../../components/auth/RegisterUser";

const Auth = () => {
  return (
    <div>
      <h2>Create New Account</h2>
      <div>
        <RegisterUser />
      </div>
      <p>Already have an account? Log in</p>
    </div>
  );
};

export default Auth;
