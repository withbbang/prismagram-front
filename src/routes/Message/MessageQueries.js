import { gql } from "apollo-boost";

//export const SEE_ROOM = gql``;

export const SEE_ROOMS = gql`
  {
    seeRooms {
      id
      participants {
        id
        name
      }
      messages {
        id
        text
        to {
          name
        }
        from {
          name
        }
      }
    }
  }
`;

//export const SEND_MESSAGE = gql``;

//export const NEW_MESSAGE = gql``;
