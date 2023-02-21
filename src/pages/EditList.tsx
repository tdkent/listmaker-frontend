import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";

import AuthContext from "../context/AuthContext";
import { TEST_DB } from "../constants/global";
import Button from "../components/FormButton";
import FormInput from "../components/FormInput";
import checkLocalStorage from "../functions/check-local-storage";
import { ShoppingListInt, ShoppingListItemInt } from "../models/shopping-list";

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
  const [listData, setListData] = useState<ShoppingListInt[]>([]);
  const [newItem, setNewItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState<string>("");

  useEffect(() => {
    setIsPending(true);
    axios
      .get(`${TEST_DB}/lists?id=${listId}`)
      .then((res) => {
        const data: ShoppingListInt[] = res.data;
        if (!data.length) {
          throw new Error("Oops! No data exists for that list.");
        }
        setListData(data);
        setEditedName(data[0].name);
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
        {!isEditing ? (
          <span onClick={() => setIsEditing(true)}>{listData[0]?.name}</span>
        ) : (
          <form
            onSubmit={async (e: React.FormEvent) => {
              e.preventDefault();
              setIsPending(true);
              const body: ShoppingListInt = { ...listData[0], name: editedName };
              await axios.put(`${TEST_DB}/lists/${listId}`, body);
              await axios.get(`${TEST_DB}/lists/${listId}`).then((res) => {
                const data: ShoppingListInt = res.data;
                console.log("data: ", data);
                setListData([data]);
                // setEditedName(data[0].name);
              });
              setIsEditing(false);
              setIsPending(false);
            }}>
            <label>
              <input
                type="text"
                autoFocus={true}
                value={editedName}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setEditedName(e.currentTarget.value);
                }}
              />
              <button type="submit">Update</button>
            </label>
          </form>
        )}
        {listData.length ? <p>{listData[0].category[0].toUpperCase() + listData[0].category.slice(1)}</p> : <p>...</p>}
      </div>
      <div>
        <form
          onSubmit={async (e: React.FormEvent) => {
            e.preventDefault();
            if (!newItem) return;
            setIsPending(true);
            const item: ShoppingListItemInt = {
              id: listData[0].items.length + 1,
              name: newItem,
              isDone: false,
            };
            const items: ShoppingListItemInt[] = [...listData[0].items, item];
            const body: ShoppingListInt = { ...listData[0], items };
            await axios.put(`${TEST_DB}/lists/${listId}`, body);
            await axios.get(`${TEST_DB}/lists/${listId}`).then((res) => {
              const data: ShoppingListInt = res.data;
              setListData([data]);
              setNewItem("");
            });
            setIsPending(false);
          }}>
          <label>
            <input
              type="text"
              autoFocus={true}
              placeholder="Add Item"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setNewItem(e.currentTarget.value);
              }}
            />
            <button type="submit">Add</button>
          </label>
        </form>
      </div>
      <div>
        <h3>Items:</h3>
        <div>
          <ul>
            {listData[0]?.items.map((item) => {
              return (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.isDone}
                    onChange={async (e: React.FormEvent) => {
                      e.preventDefault();
                      setIsPending(true);
                      const updateItem: ShoppingListItemInt = { ...item, isDone: !item.isDone };
                      const filterItems: ShoppingListItemInt[] = listData[0].items.filter((el) => el.id !== item.id);
                      const updateItems: ShoppingListItemInt[] = [...filterItems, updateItem];
                      const body: ShoppingListInt = { ...listData[0], items: updateItems };
                      await axios.put(`${TEST_DB}/lists/${listId}`, body);
                      await axios.get(`${TEST_DB}/lists/${listId}`).then((res) => {
                        const data: ShoppingListInt = res.data;
                        setListData([data]);
                      });
                      setIsPending(false);
                    }}
                  />
                  {item.name}
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
