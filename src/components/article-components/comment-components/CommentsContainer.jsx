
import { useEffect, useState } from "react"
import CommentCard from "./CommentCard"
import { fetchCommentsById } from "../../../utils/api"
import { useParams } from "react-router-dom"

const CommentsContainer = () => {
    const [comments, setComments] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    let {id} = useParams()
    
    useEffect(()=>{
        fetchCommentsById(id).then((result)=>{
            const {comments} = result
            setComments(comments)
            setLoading(false);
        }).catch((err)=>{
            console.log(err)
            setError(true)
            setLoading(false);
        })
    },[id])


    if (isLoading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }


    return (
        <div>
            {comments.map((comment=>{
                return (
                    <CommentCard key={comment.comment_id} comment={comment} />
                )
            }))}
        </div>
    )
}
export default CommentsContainer