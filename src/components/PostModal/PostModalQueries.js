import { gql } from "apollo-boost";

export const SEE_FULL_POST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      id
      location
      caption
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
