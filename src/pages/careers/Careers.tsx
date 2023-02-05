import { useLoaderData } from "react-router-dom";

interface Career {
  id: number;
  title: string;
  salary: number;
}

const Careers = () => {
  const data = useLoaderData();
  const careersData: Career[] = data as Career[];
  return (
    <div>
      {careersData.map((career: Career) => {
        return (
          <div>
            <p>{career.title}</p>
          </div>
        );
      })}
      <h3>Career List</h3>
    </div>
  );
};

export default Careers;
