import { Card } from "react-bootstrap";
import { formatDate } from "../../utils/formatting";
import  VotesCounter  from "../VotesCounter";

const ArticleCard = ({ article }) => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle>
            {article.author} in {article.topic}
          </Card.Subtitle>
          <Card.Text>{article.body}</Card.Text>
        </Card.Body>
        <Card.Img
          variant="bottom"
          src={article.article_img_url}
          alt={article.title}
        />
        <Card.Footer>
          <span> <VotesCounter articleId={article.article_id} initVotes={article.votes}/> votes</span>
          <span>{article.comment_count} comments</span>
          <span>{formatDate(article.created_at)}</span>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ArticleCard;
