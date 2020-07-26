import { gql } from "apollo-boost";

export const ME = gql`
  {
    me {
      id
      name
      email
      firstName
      lastName
      bio
      avatar
      avatarKey
      fullName
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
