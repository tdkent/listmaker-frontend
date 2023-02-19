import { useState, useEffect, useContext } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";

import AuthContext from "../context/AuthContext";
import { TEST_DB } from "../constants/global";
import Button from "../components/FormButton";
import FormInput from "../components/FormInput";
import checkLocalStorage from "../functions/check-local-storage";

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

  //TODO: type the returned data
  const fetcher = async (url: string) => {
    const { data } = await axios.get(url);
    return data[0];
  };
  const { data, error, isLoading } = useSWR(`${TEST_DB}/lists?id=${listId}`, fetcher);
  // console.log(data);

  const [newItem, setNewItem] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewItem(e.currentTarget.value);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`${TEST_DB}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        newItem,
      }),
    });
    console.log(response);
  };

  // TODO: test throw error
  if (error) return <div>failed to load</div>;
  // TODO: loading spinner
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <h2>{data.listName}</h2>
        <h4>{`${data.listCategory[0].toUpperCase()}${data.listCategory.slice(1)} List`}</h4>
      </div>
      <div>
        <Form method="post" action={`/lists/${slug}`} onSubmit={submitHandler}>
          <FormInput labelText="New Item" inputName="name" inputType="text" handleChange={handleChange} />
        </Form>
        <Button buttonText="Add" buttonType="submit" />
      </div>
      {/* Current Items List */}
      <div>
        <h4>Current Items:</h4>
        <div></div>
      </div>
      {/* Previous Items List */}
      <div>
        <h4>Previous Items:</h4>
        <div></div>
      </div>
    </div>
  );
};

export default EditList;
