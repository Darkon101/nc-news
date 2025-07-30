import { Card } from "react-bootstrap";
import { formatDate } from "../../utils/formatting";
import { Link } from "react-router-dom";
import VotesCounter from "../VotesCounter";

const ArticleCard = ({ article }) => {
  if (!article) {
    return <p>Article missing</p>;
  }

  return (
    <Card className="article-card">
      <Link to={`/articles/${article.article_id}`}>
        <Card.Img
          variant="top"
          src={article.article_img_url}
          style={{ cursor: "pointer" }}
          alt={article.title}
          className="article-card-image"
        />
      </Link>
      <Card.Body className="article-card-body">
        <Card.Title className="article-card-title">{article.title}</Card.Title>
        <Card.Subtitle className="article-card-subtitle">
          {article.author} in {article.topic}
        </Card.Subtitle>
      </Card.Body>
      <Card.Footer className="text-muted">
        <div>
          <span> <VotesCounter articleId={article.article_id} initVotes={article.votes}/> votes</span>
          <span>{article.comment_count} comments</span>
          <span>{formatDate(article.created_at)}</span>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ArticleCard;
