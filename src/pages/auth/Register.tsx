import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <section className="lg:mt-8 lg:w-3/5 lg:mx-auto">
      <h2>Create a free account</h2>
      <RegisterForm />
    </section>
  );
};

export default Register;
