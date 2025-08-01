import { Link } from "react-router-dom";
import { RiLoginCircleLine } from "react-icons/ri";

const LoginIcon = () => {
  return (
    <>
      <Link to={`/login`}>
        <RiLoginCircleLine className="login-icon"/>
      </Link>
    </>
  );
};
export default LoginIcon;
