import { useUser } from "../../../contexts/UsersContext"

const UserInfo = () => {
    const { user } = useUser()

    return (
        <div className="user-info-container">
            <div>
                <span className="user-info-text">Logged in as </span>
                <span className="user-name">{user}</span>
            </div>
        </div>
    )
}

export default UserInfo