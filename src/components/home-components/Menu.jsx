import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu"
import { useNavigate } from "react-router-dom"

const MenuComponent = () => {  
    const navigate = useNavigate()
    const handleTopicSelection = (e) => {
        if(e.value === 'Coding') {
            navigate('/topics/coding')
        } else if(e.value === 'Football') {
            navigate('/topics/football')
        } else if(e.value === 'Cooking') {
            navigate('/topics/cooking')
        }
    }

    return (
        <>
        <Menu menuButton={<MenuButton>Menu</MenuButton>} transition menuStyle={{zIndex:9999}}>
            <SubMenu label="Sort by">
                <SubMenu label="Topics">
                    <MenuItem value="Coding" onClick={handleTopicSelection}>Coding</MenuItem>
                    <MenuItem value="Football" onClick={handleTopicSelection}>Football</MenuItem>
                    <MenuItem value="Cooking" onClick={handleTopicSelection}>Cooking</MenuItem>
                </SubMenu>
            </SubMenu>
        </Menu>
        </>
    )
}

export default MenuComponent