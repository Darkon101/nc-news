import { Card } from "react-bootstrap";
import { formatDate } from "../../../utils/formatting";
import { useUser } from "../../../contexts/UsersContext";
import { useState } from "react";
import { deleteComment } from "../../../utils/api";

const CommentCard = ({ comment, onDeleteComment }) => {
  const { user } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    setError("");

    try {
      await deleteComment(comment.comment_id);
      onDeleteComment(comment.comment_id);
    } catch (err) {
      console.log(err);
      setError("Could not delete comment.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <Card.Header>
        {comment.author}
        {formatDate(comment.created_at)}
        {comment.votes}votes
      </Card.Header>
      <Card.Body>{comment.body}</Card.Body>
      {user === comment.author && (
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      )}
      <p>{error}</p>
    </Card>
  );
};

export default CommentCard;
