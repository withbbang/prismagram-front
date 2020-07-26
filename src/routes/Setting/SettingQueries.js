import { gql } from "apollo-boost";

export const EDIT_USER = gql`
  mutation editUser(
    $name: String
    $email: String
    $firstName: String
    $lastName: String
    $bio: String
  ) {
    editUser(
      name: $name
      email: $email
      firstName: $firstName
      lastName: $lastName
      bio: $bio
    ) {
      id
      name
      email
      firstName
      lastName
      bio
    }
  }
`;

export const EDIT_PHOTO = gql`
  mutation editPhoto($file: String!, $key: String!) {
    editPhoto(file: $file, key: $key)
  }
`;
