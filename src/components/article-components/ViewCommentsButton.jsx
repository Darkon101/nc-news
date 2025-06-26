import { useState } from "react";
import CommentsContainer from "./comment-components/CommentsContainer";

const ViewCommentsButton = () => {
  const [showComments, setShowComments] = useState(false);

  const onClick = () => setShowComments(!showComments)

  return <> 
    <input type="button" onClick={onClick} value={showComments ? 'Hide Comments' : 'View Comments'}/>
    {showComments ? <CommentsContainer/> : null}
  </>;
};
export default ViewCommentsButton;
