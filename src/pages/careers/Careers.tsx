import { useLoaderData, Link } from "react-router-dom";

interface Career {
  id: number;
  title: string;
  salary: number;
}

const Careers = () => {
  const data = useLoaderData();
  console.log("data: ", data);
  return (
    <div>
      {data.map((career: Career) => (
        <Link to="/" key={career.id}>
          <p>Job Title: {career.title}</p>
          <p>Salary: ${career.salary}</p>
        </Link>
      ))}
    </div>
  );
};

// loader function

export const careersLoader = async () => {
  const response = await fetch(`http://localhost:4000/careers`);
  return response.json();
};

export default Careers;
