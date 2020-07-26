import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import MessagePresenter from "./MessagePresenter";
import { useQuery, useMutation } from "react-apollo-hooks";
import {
  SEE_ROOM,
  SEE_ROOMS,
  SEND_MESSAGE,
  NEW_MESSAGE,
} from "./MessageQueries";

export default withRouter(() => {
  const { rooms, rsLoading } = useQuery(SEE_ROOMS);

  console.log("data : ", rooms);
  return <MessagePresenter />;
});
