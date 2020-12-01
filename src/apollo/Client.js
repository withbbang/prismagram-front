import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri: "https://1ca391df3388.ngrok.io",
  // uri:
  //   process.env.NODE_ENV === "development"
  //     ? "http://localhost:4000"
  //     : "https://youngstagram-backend.herokuapp.com/",
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
