import { useUser } from "../../contexts/UsersContext";
import UserInfo from "../article-components/user-components/UserInfo";
import UserSetup from "../article-components/user-components/UserSetup";


const LoginPage = () => {
  const { isUserSet } = useUser();

  if (!isUserSet) {
    return (
      <>
        <UserSetup />
      </>
    );
  }else{
    return (
        <>
            <UserInfo />
        </>
    )
  }


};

export default LoginPage;
