import { useUser } from "../../contexts/UsersContext";
import UserInfo from "../article-components/user-components/UserInfo";
import UserSetup from "../article-components/user-components/UserSetup";
import BackButton from "../BackButton";

const LoginPage = () => {
  const { isUserSet } = useUser();

  if (!isUserSet) {
    return (
      <>
        <UserSetup />
        <BackButton />
      </>
    );
  }else{
    return (
        <>
            <UserInfo />
            <BackButton />
        </>
    )
  }


};

export default LoginPage;
