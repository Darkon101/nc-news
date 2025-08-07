import Logo from "../home-components/Logo";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className="navbar">
        <div className="navbar-content">
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;