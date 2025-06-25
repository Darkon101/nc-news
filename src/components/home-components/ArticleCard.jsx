import { formatDate } from "../../utils/formatting"

const ArticleCard = ({article}) => {
    if(!article){
        return <p>Article missing</p>
    }

    return  (
        <>
            <img src={article.article_img_url} alt="article-image"/>
            <p>{article.author}</p>
            <p>{article.topic}</p>
            <p>{formatDate(article.created_at)}</p>
            <h3>{article.title}</h3>
            <p>Votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
        </>
    )
}

export default ArticleCard