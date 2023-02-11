import RegisterUser from "../components/auth/RegisterUser";

const Home = () => {
  return (
    <div>
      <h2>Welcome to ListMaker!</h2>
      <p>
        Create and edit lists. Share your lists with your friends. Complete
        to-do and shopping tasks, and keep up with your assignments!
      </p>
      <p>Create a list of any type: To-Do, Shopping, ...</p>
      <RegisterUser />
    </div>
  );
};

export default Home;
