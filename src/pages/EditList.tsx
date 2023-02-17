import { useState, useEffect } from "react";
import { Form, useParams } from "react-router-dom";
import axios from "axios";

import { TEST_DB } from "../constants/global";
import Button from "../components/forms/Button";
import FormInput from "../components/forms/FormInput";
import ListHeader from "../components/lists/ListHeader";

import { ListInt } from "../models/new-list";

const EditList = () => {
  // const { slug } = useParams();
  const params: { slug: string } = useParams() as { slug: string };
  const { slug } = params;
  const listId = params.slug.split("=")[1];

  // break incoming data into sections: header, current items, previous items
  const [listData, setListData] = useState<ListInt[]>([]);

  useEffect(() => {
    try {
      // (async function () {
      //   const { data } = await axios.get(`${TEST_DB}/lists?id=${listId}`);
      //   setListData(data);
      // })();
      const getListData = async () => {
        const { data } = await axios.get(`${TEST_DB}/lists?id=${listId}`);
        setListData(data);
      };
      getListData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  // TODO: adding items pushes locally and re-renders the page (another useEffect with itemsData as depedency)
  // TODO: the list changes are not added to the server until the user clicks a "SUBMIT CHANGES" button.
  const [itemName, setItemName] = useState("");
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setItemName(e.currentTarget.value);
  };
  const clickHandler = () => {};
  if (!listData.length) return <div>Loading...</div>;
  return (
    <div>
      {/* Header */}
      {/* <ListHeader listData={listData[0]} /> */}
      <h2>{listData[0].listName}</h2>
      <h2>{listData[0].listCategory}</h2>
      {/* Add New Item Form */}
      <div>
        <Form method="post" action={`/lists/${slug}`}>
          <FormInput
            labelText="New Item"
            inputName="name"
            inputType="text"
            handleChange={handleChange}
          />
        </Form>
        <Button
          buttonText="Add"
          buttonType={undefined}
          onClick={clickHandler}
        />
      </div>
      {/* Current Items List */}
      <div>
        <h4>Current Items:</h4>
        <div></div>
      </div>
      {/* Previous Items List */}
    </div>
  );
};

export default EditList;
