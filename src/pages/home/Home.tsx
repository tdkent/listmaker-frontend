import RegisterForm from "../../components/auth/RegisterForm";

// TODO: add list descriptions section below the register form

const Home = () => {
  return (
    <div className="my-4 px-2">
      <div>
        <h2 className="text-xl leading-8 font-semibold">
          Organize your life with powerful listmaking tools
        </h2>
        <h3 className="text-lg mt-4">Get started by creating a free account:</h3>
      </div>
      <RegisterForm />
      <p>
        Create and edit lists. Share your lists with your friends. Complete to-do and shopping
        tasks, and keep up with your assignments!
      </p>
      <p>Create a list of any type: To-Do, Shopping, ...</p>
    </div>
  );
};

export default Home;
