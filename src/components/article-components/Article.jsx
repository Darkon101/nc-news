import ArticleCard from "./ArticleCard"
import CommentsContainer from "./comment-components/CommentsContainer"
import Navbar from "./Navbar"
import ViewCommentsButton from "./ViewCommentsButton"

const Article = () => {
    return (
        <>
            <Navbar/>
            <ArticleCard/>
            <ViewCommentsButton />
            <CommentsContainer/>
        </>
    )
}

export default Article