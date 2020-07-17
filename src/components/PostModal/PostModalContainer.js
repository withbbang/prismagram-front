import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SEE_FULL_POST } from "./PostModalQueries";
import { TOGGLE_LIKE, ADD_COMMENT } from "../../SharedQueries";
import useInput from "../../hooks/useInput";
import { useMutation, useQuery } from "react-apollo-hooks";
import { toast } from "react-toastify";
import PostModalPresenter from "./PostModalPresenter";

const PostModalContainer = ({ id, handleModal }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [current, setCurrent] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");
  const { data, loading } = useQuery(SEE_FULL_POST, {
    skip: id === undefined,
    variables: { id },
  });
  const [toggleLikeMutation, { loading: tLoading }] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });
  const [addCommentMutation, { loading: aLoading }] = useMutation(ADD_COMMENT, {
    variables: { postId: id, text: comment.value },
  });

  useEffect(() => {
    if (data !== undefined) {
      setIsLiked(data.seeFullPost.isLiked);
      setLikeCount(data.seeFullPost.likeCount);
    }
  }, [data]);

  const handleCurrent = (direction) => {
    if (direction === "prev") {
      if (current === 0) {
        setCurrent(data.seeFullPost.files.length - 1);
      } else {
        setCurrent(current - 1);
      }
    } else {
      if (current === data.seeFullPost.files.length - 1) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }
  };

  const toggleLike = async () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }

    try {
      await toggleLikeMutation();
    } catch {
      toast.error("Can't register like");
    }
  };

  const onKeyPress = async (e) => {
    const { key } = e;
    if (key === "Enter") {
      e.preventDefault();
      try {
        const {
          data: { addComment },
        } = await addCommentMutation();
        setSelfComments([...selfComments, addComment]);
        comment.setValue("");
      } catch {
        toast.error("Can't send comment");
      }
    }
    return;
  };

  return (
    <PostModalPresenter
      loading={loading}
      tLoading={tLoading}
      aLoading={aLoading}
      data={data}
      handleModal={handleModal}
      current={current}
      isLiked={isLiked}
      likeCount={likeCount}
      toggleLike={toggleLike}
      newComment={comment}
      selfComments={selfComments}
      onKeyPress={onKeyPress}
      handleCurrent={handleCurrent}
    />
  );
};

PostModalContainer.propTypes = {
  id: PropTypes.string.isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default PostModalContainer;
