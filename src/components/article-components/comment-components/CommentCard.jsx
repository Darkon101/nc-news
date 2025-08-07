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
    <Card className="comment-card">
      <Card.Header>
        <div className="comment-author-info">
          <span className="comment-author">{comment.author}</span>
          <span className="comment-date">{formatDate(comment.created_at)}</span>
        </div>
        <span className="comment-votes">{comment.votes} votes</span>
      </Card.Header>
      <Card.Body>{comment.body}</Card.Body>
      {(user === comment.author || error) && (
        <div className="comment-actions">
          {user === comment.author && (
            <button
              className="delete-comment-btn"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      )}
      {error && <p className="comment-error">{error}</p>}
    </Card>
  );
};

export default CommentCard;
