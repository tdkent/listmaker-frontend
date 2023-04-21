import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import checkLocalStorage from "../../utils/check-local-storage";
import useUser from "../../hooks/useUser";
import EditProfileForm from "../../components/user/EditProfileForm";
import { EditProfileReqInt } from "../../models/user";
import QueryError from "../../components/errors/queryError";

const EditProfile = () => {
  // auth check
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn, navigate]);

  // query
  const { isLoading, isError, data, error } = useUser(auth.userId as number, auth.token as string);

  if (isLoading) {
    // TODO: Loading graphic / spinner
    return <div>Loading...</div>;
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

  // TODO: grab only the editable fields from the user data object

  const editUserData: EditProfileReqInt = {
    userNickname: data.user.userNickname,
  };

  return (
    <div>
      <h2>Edit Your Profile</h2>
      <div>
        <EditProfileForm user={editUserData} />
      </div>
      {/* // TODO: Add a cancel button */}
    </div>
  );
};

export default EditProfile;
