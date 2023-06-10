import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import checkLocalStorage from "../../utils/check-local-storage";
import useUser from "../../hooks/useUser";
import QueryError from "../../components/errors/QueryError";
import NullDataError from "../../components/errors/NullDataError";
import DisplayEmail from "../../components/user/DisplayEmail";
import DisplayNickname from "../../components/user/DisplayNickname";
import EditNicknameForm from "../../components/user/EditNicknameForm";
import DisplayPassword from "../../components/user/DisplayPassword";
import EditPasswordForm from "../../components/user/EditPasswordForm";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import DisplayDarkMode from "../../components/user/DisplayDarkMode";
import EditDarkMode from "../../components/user/EditDarkMode";

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
  const [editDarkMode, setEditDarkMode] = useState(false);

  // query
  const { isLoading, isError, data, error } = useUser(auth.userId!, auth.token!);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <QueryError error={error} />;
  }

  if (!data || !data.user) {
    return <NullDataError />;
  }

  const userData = data.user;

  return (
    <section className="lg:mt-8 lg:w-3/5 lg:mx-auto">
      <h2 className="text-[19px] overflow-hidden whitespace-nowrap lg:text-3xl">
        {userData.userNickname ? userData.userNickname + "'s" : "My"} Profile
      </h2>
      <div className="my-6 lg:my-10">
        <DisplayEmail userEmail={userData.userEmail} />
      </div>
      <div className="my-6 lg:my-10">
        {editNickname ? (
          <EditNicknameForm
            userNickname={userData.userNickname}
            setEditNickname={setEditNickname}
          />
        ) : (
          <DisplayNickname userNickname={userData.userNickname} setEditNickname={setEditNickname} />
        )}
      </div>
      <div className="my-6 lg:my-10">
        {editPassword ? (
          <EditPasswordForm setEditPassword={setEditPassword} />
        ) : (
          <DisplayPassword setEditPassword={setEditPassword} />
        )}
      </div>
      <div className="my-6 lg:my-10">
        {editDarkMode ? (
          <EditDarkMode setEditDarkMode={setEditDarkMode} />
        ) : (
          <DisplayDarkMode setEditDarkMode={setEditDarkMode} />
        )}
      </div>
    </section>
  );
};

export default Profile;
