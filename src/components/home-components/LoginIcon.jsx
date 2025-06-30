import { Link } from "react-router-dom";
import loginIcon from "../../assets/log-in.png";

const LoginIcon = () => {
  return (
    <>
      <Link to={`/login`}>
        <img src={loginIcon} alt="login-icon" style={{ cursor: "pointer" }} width="100px" height="100px"/>
      </Link>
    </>
  );
};
export default LoginIcon;
