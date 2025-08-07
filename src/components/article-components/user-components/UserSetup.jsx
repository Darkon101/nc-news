import { useState } from "react";
import { useUser } from "../../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../../utils/api";

const UserSetup = () => {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { setUserContext } = useUser();
  const navigate = useNavigate();

  const handleSetUser = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const { users } = await fetchUsers()
      const matchedUser = users.find((user) => user.username === username && user.name === name)
      
      if (!matchedUser) {
        setError("Invalid username or name.")
        setIsLoading(false)
        return
      }

      setUserContext(matchedUser.username)
      navigate('/')
    } catch (error) {
      console.log(error)
      setError("Something went wrong...")
      setIsLoading(false)
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">Sign In</h2>
  
        </div>

        <form className="login-form" onSubmit={handleSetUser}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              required
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Demo: grumpy19"
              maxLength={20}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              required
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Demo: Paul Grump"
              maxLength={20}
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? '' : 'Sign in'}
          </button>
        </form>

        {error && <div className="login-error">{error}</div>}
      </div>
    </div>
  );
};

export default UserSetup;