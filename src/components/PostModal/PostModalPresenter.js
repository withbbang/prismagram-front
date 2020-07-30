import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import {
  Close,
  HeartFull,
  HeartEmpty,
  Arrow,
  Comment as CommentIcon,
} from "../Icons";
import Avatar from "../Avatar";
import FatText from "../FatText";
import FollowButton from "../FollowButton";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.4);
`;

const CloseDiv = styled.div`
  position: fixed;
  top: 5%;
  right: 5%;
  cursor: pointer;
  z-index: 6;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
`;

const Content = styled.div`
  width: 70%;
  height: 50%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 6;
  opcity: 1;
`;

const ArrowDiv = styled.div`
  position: absolute;
  top: 50%;
  cursor: pointer;
`;

const LeftStuff = styled.div`
  position: relative;
  ${ArrowDiv} {
    &:first-child {
      left: 5%;
      transform: rotate(180deg);
    }
    &:last-child {
      right: 5%;
    }
  }
  width: 60%;
  height: 100%;
  background-image: url(${(props) => props.url});
  background-size: cover;
`;

const RightStuff = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  border-left: solid 1px #efefef;
  box-sizing: border-box;
`;

const Profile = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  border-bottom: solid 1px #efefef;
  box-sizing: border-box;
  align-items: center;
  padding: 0 15px;
`;

const CommentsBox = styled.ul`
  width: 100%;
  height: 55%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  border-bottom: solid 1px #efefef;
  box-sizing: border-box;
`;

const CommentBox = styled.li`
  padding: 10px 15px 0;
  display: flex;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
`;

const Com = styled.div`
  max-width: 200px;
  min-width: 100px;
  line-height: 1.2;
  margin-left: 10px;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: solid 1px #efefef;
  box-sizing: border-box;
  padding: 15px;
`;

const ELink = styled(Link)`
  max-width: 150px;
  margin-left: 10px;
  margin-bottom: 5px;
  color: inherit;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FollowToggleBtn = styled.div`
  width: 30%;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
`;
const TextBox = styled.div`
  width: 100%;
  height: 10%;
  max-height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

export default ({
  loading,
  tLoading,
  aLoading,
  data,
  handleModal,
  current,
  isLiked,
  likeCount,
  toggleLike,
  newComment,
  selfComments,
  onKeyPress,
  handleCurrent,
}) => (
  <Modal>
    <CloseDiv onClick={handleModal}>
      <Close />
    </CloseDiv>
    <Background onClick={handleModal} />
    <Content>
      {(loading || tLoading || aLoading) && <Loader />}{" "}
      {data && data.seeFullPost && data.me && (
        <>
          <LeftStuff url={data.seeFullPost.files[current].url}>
            <ArrowDiv onClick={() => handleCurrent("prev")}>
              <Arrow />
            </ArrowDiv>
            <ArrowDiv onClick={() => handleCurrent("next")}>
              <Arrow />
            </ArrowDiv>
          </LeftStuff>
          <RightStuff>
            <Profile>
              <Avatar url={data.seeFullPost.user.avatar} size={"sm"} />
              <ELink to={`/${data.seeFullPost.user.name}`}>
                <FatText text={data.seeFullPost.user.name} />
              </ELink>
              {!data.seeFullPost.user.isSelf && (
                <FollowToggleBtn>
                  <FollowButton
                    id={data.seeFullPost.user.id}
                    isFollowing={data.seeFullPost.user.isFollowing}
                  />
                </FollowToggleBtn>
              )}
            </Profile>
            <CommentsBox>
              <CommentBox>
                <Avatar url={data.me.avatar} size={"sm"} />
                <Comment>
                  <ELink to={`/${data.me.name}`}>
                    <FatText text={data.me.name} />
                  </ELink>
                  <Com>{data.seeFullPost.caption}</Com>
                </Comment>
              </CommentBox>
              {data.seeFullPost.comments.map((comment) => (
                <CommentBox key={comment.id}>
                  <Avatar url={comment.user.avatar} size={"sm"} />
                  <Comment>
                    <ELink to={`/${comment.user.name}`}>
                      <FatText text={comment.user.name} />
                    </ELink>
                    <Com>{comment.text}</Com>
                  </Comment>
                </CommentBox>
              ))}
              {selfComments.map((comment, idx) => (
                <CommentBox key={idx}>
                  <Avatar url={data.me.avatar} size={"sm"} />
                  <Comment>
                    <ELink to={`/${data.me.name}`}>
                      <FatText text={data.me.name} />
                    </ELink>
                    <Com>{comment.text}</Com>
                  </Comment>
                </CommentBox>
              ))}
            </CommentsBox>
            <InfoBox>
              <Buttons>
                <Button onClick={toggleLike}>
                  {isLiked ? <HeartFull /> : <HeartEmpty />}
                </Button>
                <Button>
                  <CommentIcon />
                </Button>
              </Buttons>
              <FatText text={`${likeCount} likes`} />
            </InfoBox>
            <TextBox>
              <Textarea
                placeholder={"Add a comment..."}
                value={newComment.value}
                onChange={newComment.onChange}
                onKeyPress={onKeyPress}
              />
            </TextBox>
          </RightStuff>
        </>
      )}
    </Content>
  </Modal>
);
