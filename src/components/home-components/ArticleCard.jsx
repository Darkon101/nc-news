import { Card } from "react-bootstrap";
import { formatDate } from "../../utils/formatting";
import { Link } from "react-router-dom";
import VotesCounter from "./VotesCounter";

const ArticleCard = ({ article, onReadClick }) => {
  if (!article) {
    return <p>Article missing</p>;
  }

  return (
    <Card>
      <Link to={`/articles/${article.article_id}`}>
        <Card.Img
          variant="top"
          src={article.article_img_url}
          onClick={onReadClick}
          style={{ cursor: "pointer" }}
          alt={article.title}
        />
      </Link>
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
        <Card.Subtitle>
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
