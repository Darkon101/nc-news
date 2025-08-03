import LoginIcon from "./LoginIcon";
import Logo from "./Logo";
import MenuComponent from "./Menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header-content">
          <Link to={"/"}>
            <Logo />
          </Link>
          <div className="right-header-buttons">
              <LoginIcon />
              <MenuComponent />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
