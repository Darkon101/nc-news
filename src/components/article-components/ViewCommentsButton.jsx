import { useState } from "react";
import CommentsContainer from "./comment-components/CommentsContainer";

const ViewCommentsButton = () => {
  const [showComments, setShowComments] = useState(false);

  const onClick = () => setShowComments(!showComments);

  return (
    <>
      <div className="view-comments-container">
        <input 
          type="button" 
          onClick={onClick} 
          value={showComments ? 'Hide Comments' : 'View Comments'}
          className={`view-comments-btn ${showComments ? 'hide-comments' : 'show-comments'}`}
        />
      </div>
      <div className={`comments-section-wrapper ${showComments ? 'show' : ''}`}>
        {showComments && <CommentsContainer />}
      </div>
    </>
  );
};

export default ViewCommentsButton;