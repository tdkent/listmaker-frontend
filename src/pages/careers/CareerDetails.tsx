import { useLoaderData } from "react-router-dom";

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
  return fetch(`http://localhost:4000/careers/${id}`);
};
