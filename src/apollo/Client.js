import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri: "https://e634c8ea4e42.ngrok.io",
  // process.env.NODE_ENV === "development"
  //   ? "http://localhost:4000"
  //   : "https://youngstagram-backend.herokuapp.com/",
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
