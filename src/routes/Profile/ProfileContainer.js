import React, { useState } from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";

const GET_USER = gql`
  query seeUser($name: String!) {
    seeUser(name: $name) {
      id
      avatar
      name
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(
  ({
    match: {
      params: { name },
    },
  }) => {
    const [modal, setModal] = useState(false);
    const [id, setId] = useState(0);
    const { data, loading } = useQuery(GET_USER, { variables: { name } });
    const [logOut] = useMutation(LOG_OUT);

    const handleModal = (id) => {
      if (modal) {
        setId(0);
        setModal(false);
      } else {
        setId(id);
        setModal(true);
      }
    };

    return (
      <ProfilePresenter
        loading={loading}
        logOut={logOut}
        data={data}
        modal={modal}
        handleModal={handleModal}
        postId={id}
      />
    );
  }
);
