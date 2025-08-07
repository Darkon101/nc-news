import { Card } from "react-bootstrap";
import { formatDate } from "../../utils/formatting";
import VotesCounter from "../VotesCounter";

const ArticleCard = ({ article }) => {
  return (
    <>
      <Card className="article-detail-card">
        <Card.Body className="article-detail-card-body">
          <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle className="article-detail-card-subtitle">
            {article.author} in {article.topic}
          </Card.Subtitle>
          <Card.Text className="article-detail-card-text">{article.body}</Card.Text>
        </Card.Body>
        <div className="article-detail-card-image-container">
          <Card.Img
            variant="bottom"
            src={article.article_img_url}
            alt={article.title}
            className="article-detail-card-image"
          />
        </div>

        <Card.Footer className="article-footer">
          <span>
            {" "}
            <VotesCounter
              articleId={article.article_id}
              initVotes={article.votes}
            />
          </span>
          <span>{article.comment_count} comments</span>
          <span>{formatDate(article.created_at)}</span>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ArticleCard;
