import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);
  const [followMutation, { loading: followLoading }] = useMutation(FOLLOW, {
    variables: { id },
  });
  const [unfollowMutation, { loading: unfollowLoading }] = useMutation(
    UNFOLLOW,
    { variables: { id } }
  );

  const onClick = () => {
    if (isFollowingS === true) {
      setIsFollowing(false);
      unfollowMutation();
    } else {
      setIsFollowing(true);
      followMutation();
    }
  };
  return (
    <FollowButtonPresenter
      onClick={onClick}
      isFollowing={isFollowingS}
      loading={[followLoading, unfollowLoading]}
    />
  );
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FollowButtonContainer;
