import { useState } from "react";
import { useUser } from "../../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../../utils/api";

const UserSetup = () => {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const { setUserContext } = useUser();
  const navigate = useNavigate();

  const handleSetUser = async (e) => {
    e.preventDefault()
    setError("")

    try {
        const {users} = await fetchUsers()
        const matchedUser = users.find((user) => user.username === username && user.name === name)
        if (!matchedUser){
            setError("Invalid username or name.")
            return
        }

        setUserContext(matchedUser.username)
        navigate('/')
    } catch (error) {
        console.log(error)
        setError("Something went wrong...")
    }
    
  };


  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSetUser}>
        <label htmlFor="username"></label>
        <input
          required
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username..."
          maxLength={20}
          onKeyDown={(e) => e.key === "Enter" && handleSetUser()}
        />
        <label htmlFor="name"></label>
        <input
          required
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          maxLength={20}
          onKeyDown={(e) => e.key === "Enter" && handleSetUser()}
        />
        <button type="submit">Login</button>
      </form>
      <p>{error}</p>
    </>
  );
};

export default UserSetup;
