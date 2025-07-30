import LoginIcon from "./LoginIcon";
import Logo from "./Logo";
import MenuComponent from "./Menu";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header-content">
          <Logo />
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
