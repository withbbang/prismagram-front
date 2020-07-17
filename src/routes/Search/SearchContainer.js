import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";

export default withRouter(({ location: { search } }) => {
  const term = search.split("=")[1];
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(0);
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term,
    },
  });

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
    <SearchPresenter
      searchTerm={term}
      loading={loading}
      data={data}
      modal={modal}
      handleModal={handleModal}
      id={id}
    />
  );
});
