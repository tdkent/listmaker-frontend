import { useLoaderData, Link } from "react-router-dom";

const Careers = () => {
  const data = useLoaderData();
  console.log("data: ", data);
  return (
    <div>
      {/* {data.map((career: Career) => (
        <Link to="/" key={career.id}>
          <p>Job Title: {career.title}</p>
          <p>Salary: ${career.salary}</p>
        </Link>
      ))} */}
      <h3>Career List</h3>
    </div>
  );
};

// loader function

export const careersLoader = async () => {
  const response = await fetch(`http://localhost:4000/careers`);
  return response.json();
};

export default Careers;
