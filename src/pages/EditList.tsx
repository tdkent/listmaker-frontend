import { useEffect, useContext, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import AuthContext from "../context/AuthContext";
import ModalContext from "../context/ModalContext";
import { TEST_DB } from "../constants/global";
import checkLocalStorage from "../functions/check-local-storage";
import { ShoppingListInt } from "../models/lists";
import EditListHeader from "../components/EditListHeader";
import { initialState, EditListReducerActionInt, EditListActionTypesEnum } from "../models/edit-list";

const reducer = (state: typeof initialState, action: EditListReducerActionInt) => {
  if (action.type === EditListActionTypesEnum.fetchSuccess) {
    return {
      loading: false,
      error: "",
      list: action.payload,
    };
  }
  if (action.type === EditListActionTypesEnum.notFoundError) {
    return { loading: false, error: "That list does not exist.", list: {} };
  }
  if (action.type === EditListActionTypesEnum.fetchError) {
    return { loading: false, error: action.error as string, list: {} };
  }
  if (action.type === EditListActionTypesEnum.editListName) {
    return { loading: false, error: action.error as string, list: {} as };
  }
  return state;
};

const EditList = () => {
  // user auth check
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn, navigate]);

  // constants
  // const modal = useContext(ModalContext);
  const { slug }: { slug: string } = useParams() as { slug: string };
  const listId = Number(slug.split("=")[1]);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get(`${TEST_DB}/lists?id=${listId}`)
      .then((res) => {
        if (!res.data.length) {
          return dispatch({
            type: EditListActionTypesEnum.notFoundError,
          });
        }
        dispatch({
          type: EditListActionTypesEnum.fetchSuccess,
          payload: res.data[0],
        });
      })
      .catch((err) => {
        dispatch({ type: EditListActionTypesEnum.fetchError, error: err.message });
      });
  }, []);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  if (state.error) {
    return (
      <div>
        <h2>Oh no!</h2>
        <h4>Sorry, an error occurred.</h4>
        <p>{state.error}</p>
      </div>
    );
  }

  return (
    <div>
      <EditListHeader list={state.list} dispatch={dispatch} />
    </div>
  );
};

export default EditList;
