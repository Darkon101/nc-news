import { useUser } from "../../../contexts/UsersContext"

const UserInfo = () => {
    const {user} = useUser()

    return (
        <>
            <span>Logged in as {user}</span>
        </>
    )
}

export default UserInfo