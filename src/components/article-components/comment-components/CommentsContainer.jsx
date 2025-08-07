import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { fetchCommentsById } from "../../../utils/api";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import CommentForm from "./CommentForm";
import UserInfo from "../user-components/UserInfo";

const CommentsContainer = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    fetchCommentsById(id)
      .then((result) => {
        const { comments } = result;
        setComments(comments);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  const handlePostComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleDeleteComment = (id) => {
    setComments((currentComments) =>
      currentComments.filter((comment) => comment.comment_id !== id)
    );
  };


  return (
    <Container className="comments-container">
  <UserInfo />
  <CommentForm articleId={id} onPostComment={handlePostComment} />
  <div className="comments-list">
    {comments.length === 0 ? (
      <div className="no-comments">No comments yet. Be the first to comment!</div>
    ) : (
      comments.map((comment) => (
        <CommentCard 
          key={comment.comment_id} 
          comment={comment} 
          onDeleteComment={handleDeleteComment}
        />
      ))
    )}
  </div>
</Container>
  );
};

export default CommentsContainer;
