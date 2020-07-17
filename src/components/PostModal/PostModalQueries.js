import { gql } from "apollo-boost";

export const SEE_FULL_POST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      id
      user {
        id
        name
        avatar
        isFollowing
        isSelf
      }
      files {
        id
        url
      }
      isLiked
      likeCount
      comments {
        id
        user {
          id
          name
          avatar
        }
        text
      }
    }
    me {
      id
      name
      avatar
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      user {
        name
      }
    }
  }
`;
