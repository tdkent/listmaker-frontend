import { useLoaderData, Link } from "react-router-dom";

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
      {careersData.map((career: Career) => (
        <Link to={`/careers/${career.id}`} key={career.id}>
          <p>{career.title}</p>
          <p>Salary: ${career.salary}</p>
        </Link>
      ))}
    </div>
  );
};

export default Careers;
