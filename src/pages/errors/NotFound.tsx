import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import checkLocalStorage from "../../utils/check-local-storage";
import Hyperlink from "../../components/forms/Hyperlink";
import CircleExclamation from "../../icons/CircleExclamation";

const NotFound = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn, navigate]);

  return (
    <div>
      <div className="flex flex-row items-center mt-6">
        <CircleExclamation styles="h-6 w-6 mr-2" /> <h2>404</h2>
      </div>
      <div className="mt-4">
        <p className="font-medium">Page not found</p>
      </div>
      <div className="mt-6">
        <Hyperlink to="/">Go to home page</Hyperlink>
      </div>
    </div>
  );
};

export default NotFound;
