import { Card } from "react-bootstrap";
import { formatDate } from "../../utils/formatting";
import { Link } from "react-router-dom";
import VotesCounter from "../VotesCounter";
import { RiMessage3Line } from "react-icons/ri";

const ArticleCard = ({ article }) => {
  if (!article) {
    return <p>Article missing</p>;
  }

  return (
    <Card className="article-card">
      <Link to={`/articles/${article.article_id}`}>
        <div className="article-card-image-container">
          <Card.Img
            variant="top"
            src={article.article_img_url}
            style={{ cursor: "pointer" }}
            alt={article.title}
            className="article-card-image"
          />
        </div>
      </Link>
      <Card.Body className="article-card-body">
        <Card.Title className="article-card-title">{article.title}</Card.Title>
        <Card.Subtitle className="article-card-subtitle">
          {article.author} in {article.topic}
        </Card.Subtitle>
      </Card.Body>
      <Card.Footer className="article-stats">
          <VotesCounter articleId={article.article_id} initVotes={article.votes}/>
          <span className="article-card-comments-container"> <RiMessage3Line size={"20px"}/> {article.comment_count}</span>
          <span>{formatDate(article.created_at)}</span>
      </Card.Footer>
    </Card>
  );
};

export default ArticleCard;
