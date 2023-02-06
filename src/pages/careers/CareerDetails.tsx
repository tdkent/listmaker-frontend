import { useLoaderData, json } from "react-router-dom";

interface Career {
  id: number;
  title: string;
  salary: number;
}

const CareerDetails = () => {
  // const { id } = useParams();
  const data = useLoaderData();
  const careerData: Career = data as Career;
  return (
    <div>
      <p>Job ID: {careerData.id}</p>
      <p>Job Title: {careerData.title}</p>
      <p>Salary: {careerData.salary}</p>
    </div>
  );
};

export default CareerDetails;

export const careerDetailsLoader = async ({ params }: any) => {
  const { id } = params;
  const response = await fetch(`http://localhost:4000/careers/${id}`);
  if (!response.ok) {
    throw json(
      {
        message: "Career with id " + id + " does not exist.",
        helpEmail: "help@fake.com",
      },
      {
        status: 404,
      }
    );
  }
  return response.json();
};
