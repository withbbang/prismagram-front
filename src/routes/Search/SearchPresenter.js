import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../components/FatText";
import Loader from "../../components/Loader";
import UserCard from "../../components/UserCard";
import SquarePost from "../../components/SquarePost";
import PostModal from "../../components/PostModal";

const Wrapper = styled.div`
  height: 50vh;
`;

const Section = styled.div`
  margin-top: 10px;
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const PostSection = styled(Section)`
  margin-top: 10px;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;

const SearchPresenter = ({
  searchTerm,
  loading,
  data,
  modal,
  handleModal,
  id,
}) => {
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <FatText text="Search for something" />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <>
        {modal && id && <PostModal id={id} handleModal={handleModal} />}
        <Wrapper>
          {data.searchUser.length === 0 ? (
            <>
              <FatText text="No Users Found" />
              <PostSection />
            </>
          ) : (
            <>
              <FatText text="Users Found" />
              <PostSection>
                {data.searchUser.map((user) => (
                  <UserCard
                    key={user.id}
                    username={user.name}
                    isFollowing={user.isFollowing}
                    url={user.avatar}
                    isSelf={user.isSelf}
                    id={user.id}
                  />
                ))}
              </PostSection>
            </>
          )}
          {data.searchPost.length === 0 ? (
            <>
              <FatText text="No Posts Found" />
              <Section />
            </>
          ) : (
            <>
              <FatText text="Posts Found" />
              <Section>
                {data.searchPost.map((post) => (
                  <SquarePost
                    key={post.id}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    file={post.files[0]}
                    handleModal={handleModal}
                    id={post.id}
                  />
                ))}
              </Section>
            </>
          )}
        </Wrapper>
      </>
    );
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
  modal: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default SearchPresenter;
