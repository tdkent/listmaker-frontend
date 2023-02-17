import { ListInt } from "../../models/new-list";

interface ListHeaderProps {
  listData: ListInt;
}

const ListHeader = (props: ListHeaderProps) => {
  console.log("props: ", props);
  return <div>{props.listData.listName}</div>;
};

export default ListHeader;
