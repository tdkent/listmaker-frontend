import { useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface List {
  creatorId: number;
  id: number;
  listName: string;
  listType: string;
}

const UserLists = () => {
  const [lists, setLists] = useState<List[]>([]);
  const { userId } = useParams();
  const data = useLoaderData();
  const typedData: List[] = data as List[];

  useEffect(() => {
    const userLists = typedData.filter(
      (list) => list.creatorId === Number(userId)
    );
    const setListData = (): void => {
      setLists([...userLists]);
    };
    setListData();
  }, [typedData, userId]);

  return (
    <div>
      <h2>My Lists</h2>
      <div>
        {lists.map((list) => {
          return (
            <div key={list.id}>
              <p>{list.listName}</p>
              <p>List Type: {list.listType}</p>
              <p>List ID: {list.id}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserLists;

export const userListsLoader = async () => {
  // const response = await fetch("http://localhost:4000/lists");
  // const data = await response.json();
  // console.log("data: ", data);
  // return data;
  return fetch("http://localhost:4000/lists");
};
