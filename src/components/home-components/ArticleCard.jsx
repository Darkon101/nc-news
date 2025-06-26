import { Card } from "react-bootstrap";
import { formatDate } from "../../utils/formatting";
import { Link } from "react-router-dom";

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
        {formatDate(article.created_at)}
      </Card.Footer>
    </Card>
  );
};

export default ArticleCard;
