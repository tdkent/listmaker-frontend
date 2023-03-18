import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import checkLocalStorage from "../utils/check-local-storage";

const NotFound = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn]);

  return (
    <div>
      <h2>404</h2>
      <h3>Page Not Found</h3>
    </div>
  );
};

export default NotFound;
