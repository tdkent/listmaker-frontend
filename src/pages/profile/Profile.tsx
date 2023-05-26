import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import checkLocalStorage from "../../utils/check-local-storage";
import useUser from "../../hooks/useUser";
import QueryError from "../../components/errors/QueryError";
import DisplayEmail from "../../components/user/DisplayEmail";
import DisplayNickname from "../../components/user/DisplayNickname";
import EditNicknameForm from "../../components/user/EditNicknameForm";
import DisplayPassword from "../../components/user/DisplayPassword";
import EditPasswordForm from "../../components/user/EditPasswordForm";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Profile = () => {
  // auth check
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn, navigate]);

  const [editNickname, setEditNickname] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  // query
  const { isLoading, isError, data, error } = useUser(auth.userId!, auth.token!);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <QueryError error={error} />;
  }

  //! TODO: initiate logout
  if (!data || !data.user) {
    return (
      <div>
        <h2>Could not find your account info</h2>
        <p>Your account may have lost or deleted.</p>
      </div>
    );
  }

  const userData = data.user;

  return (
    <div>
      <h2>{userData.userNickname ? userData.userNickname + "'s" : "My"} Profile</h2>
      <div className="my-6">
        <DisplayEmail userEmail={userData.userEmail} />
      </div>
      <div className="my-4">
        {editNickname ? (
          <EditNicknameForm
            userNickname={userData.userNickname}
            setEditNickname={setEditNickname}
          />
        ) : (
          <DisplayNickname userNickname={userData.userNickname} setEditNickname={setEditNickname} />
        )}
      </div>
      <div className="my-4 py-4">
        {editPassword ? (
          <EditPasswordForm setEditPassword={setEditPassword} />
        ) : (
          <DisplayPassword setEditPassword={setEditPassword} />
        )}
      </div>
    </div>
  );
};

export default Profile;
