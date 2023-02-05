import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h2>404 - Page not found!</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
        quod soluta nihil odit aut dolorum quisquam quam? Facilis ipsam tempora
        sunt. Ut id quo sint pariatur eos recusandae, possimus accusamus,
        eveniet nesciunt, quia iste rem ex. Cum ipsum consequuntur repudiandae!
      </p>
      <p>
        Go to the <Link to="/">Homepage</Link>
      </p>
    </div>
  );
};

export default NotFound;
