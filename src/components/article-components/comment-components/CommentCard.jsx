import { Card } from "react-bootstrap";
import { formatDate } from "../../../utils/formatting";

const CommentCard = ({ comment }) => {
  return (
    <Card>
      <Card.Header>
        {comment.author}
        {formatDate(comment.created_at)}
        {comment.votes}votes
      </Card.Header>
      <Card.Body>{comment.body}</Card.Body>
    </Card>
  );
};

export default CommentCard;
