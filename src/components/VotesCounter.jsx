import { useEffect, useState } from "react";
import { updateVotes } from "../utils/api";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";

const VotesCounter = ({ articleId, initVotes }) => {
  const [votesCount, setVotesCount] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setVotesCount(initVotes || 0);
    setHasVoted(false);
  }, [initVotes]);

  const handleVotes = async () => {
    setError(null);

    const voteChange = hasVoted ? -1 : 1;

    setVotesCount((currentVoteCount) => currentVoteCount + voteChange);
    setHasVoted(!hasVoted);

    try {
      await updateVotes(articleId, voteChange);
    } catch (err) {
      setVotesCount((currentVoteCount) => currentVoteCount - voteChange);
      setHasVoted(hasVoted);
      setError("Failed to update vote");
      console.log(err);
    }
  };

  return (
    <>
      <div className="heart-container">
        {hasVoted ? (
          <RiHeartFill
            color="red"
            onClick={handleVotes}
            size={"20px"}
            className="heart voted"
          />
        ) : (
          <RiHeartLine onClick={handleVotes} size={"20px"} className="heart" />
        )}
        <span>{votesCount}</span>
      </div>
      <p>{error}</p>
    </>
  );
};

export default VotesCounter;
