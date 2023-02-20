import { useState, useEffect, useContext } from "react";
import { Form, useNavigate, useParams, json } from "react-router-dom";
// import useSWR from "swr";
import axios, { AxiosError } from "axios";

import AuthContext from "../context/AuthContext";
import { TEST_DB } from "../constants/global";
import Button from "../components/FormButton";
import FormInput from "../components/FormInput";
import checkLocalStorage from "../functions/check-local-storage";
import ShoppingListInt from "../models/shopping-list";

const EditList = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const check = checkLocalStorage();
    if (check) return;
    else navigate("/login");
  }, [auth.isLoggedIn]);

  const { slug }: { slug: string } = useParams() as { slug: string };
  const listId = Number(slug.split("=")[1]);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [listName, setListName] = useState("");
  const [listCategory, setListCategory] = useState("");
  const [currentItems, setCurrentItems] = useState<string[]>([]);
  const [previousItems, setPreviousItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    setIsPending(true);
    axios
      .get(`${TEST_DB}/lists?id=${listId}`)
      .then((res) => {
        console.log(res.data[0]);
        const listData: ShoppingListInt = res.data[0];
        if (!listData) {
          throw new Error("Oops! No data exists for that list.");
        }
        setListName(listData.listName);
        setListCategory(listData.listCategory);
        setCurrentItems(listData.data.currentItems);
        setPreviousItems(listData.data.previousItems);
      })
      .catch((err: AxiosError | { message: string }) => {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else setError(err.message);
      })
      .finally(() => setIsPending(false));
  }, []);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>404</h2>
        <h4>Not Found</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h2>{listName}</h2>
        <h4>{listCategory} list</h4>
      </div>
      <div>
        <form
          onSubmit={async (e: React.FormEvent) => {
            e.preventDefault();
            if (!newItem) return;
            setCurrentItems((prev) => [...prev, newItem]);
            setNewItem("");
          }}>
          <FormInput
            labelText="Add new"
            inputType="text"
            inputName="name"
            value={newItem}
            handleChange={(e: React.FormEvent<HTMLInputElement>) => {
              console.log("e: ", e.currentTarget.value);
              setNewItem(e.currentTarget.value);
            }}
          />
          <Button buttonText="+" buttonType="submit" />
        </form>
      </div>
      <div>
        <h3>Current Items</h3>
        <div>
          <ul>
            {currentItems.map((item) => {
              return (
                <li key={currentItems.indexOf(item)}>
                  <input
                    type="checkbox"
                    onClick={(e: React.FormEvent<HTMLInputElement>) => {
                      setCurrentItems((prev) => [...prev.filter((curr) => curr !== item)]);
                      setPreviousItems((prev) => [...prev, item]);
                    }}
                  />
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h4>Previous Items</h4>
          <ul>
            {previousItems.map((item) => {
              return (
                <li key={previousItems.indexOf(item)}>
                  <input
                    type="checkbox"
                    onClick={(e: React.FormEvent<HTMLInputElement>) => {
                      setPreviousItems((prev) => [...prev.filter((curr) => curr !== item)]);
                      setCurrentItems((prev) => [...prev, item]);
                    }}
                  />
                  {item}
                  <button onClick={() => setPreviousItems((prev) => [...prev.filter((curr) => curr !== item)])}>
                    -
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditList;
