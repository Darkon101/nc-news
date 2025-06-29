import { useState } from "react";
import { useUser } from "../../../contexts/UsersContext";
import { postComment } from "../../../utils/api";

const CommentForm = ({ articleId, onPostComment }) => {
  const [comment, setComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { user } = useUser();

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    setIsPosting(true);

    try {
      const result = await postComment(articleId, user, comment.trim());
      onPostComment(result.postedComment);
      setComment("");
    } catch (error) {
      console.log(error)
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitComment}>
        <label htmlFor="comment">Your Comment</label>
        <input
          type="text"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          maxLength={140}
          disabled={isPosting}
          required
        />
        <button type="submit" disabled={!comment.trim() || isPosting}>
          {isPosting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </>
  );
};

export default CommentForm;
