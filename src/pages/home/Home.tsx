import AuthenticateUser from "../../components/auth/AuthenticateUser";

const Home = () => {
  return (
    <div>
      <h2>Welcome to ListMaker!</h2>
      <p>
        Create and edit lists. Share your lists with your friends. Complete
        to-do and shopping tasks, and keep up with your assignments!
      </p>
      <AuthenticateUser />
    </div>
  );
};

export default Home;
