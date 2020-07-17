import React from "react";
import Button from "../Button";
import Loader from "../Loader";

export default ({ isFollowing, onClick, loading }) => (
  <>
    {(loading[0] || loading[1]) && <Loader />}
    <Button text={isFollowing ? "Unfollow" : "Follow"} onClick={onClick} />
  </>
);
