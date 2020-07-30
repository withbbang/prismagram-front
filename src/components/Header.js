import React, { useState } from "react";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { ME } from "../SharedQueries";
import { useQuery, useMutation } from "react-apollo-hooks";
import Input from "./Input";
import useInput from "../hooks/useInput";
import {
  Compass,
  HeartEmpty,
  User,
  Logo,
  Setting,
  Profile,
  Message,
} from "./Icons";
import FatText from "./FatText";
import Loader from "./Loader";

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  display: flex;
  text-align: center;
`;

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderBtn = styled.div`
  cursor: pointer;
  position: relative;
  &:not(:last-child) {
    margin-right: 30px;
  }
  &:first-child {
    margin-left: auto;
  }
`;

const DropDown = styled.ul`
  position: absolute;
  top: 100%;
  right: -340%;
  cursor: pointer;
  width: 200px;
  max-width: 200px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 5px 1px rgba(var(--jb7, 0, 0, 0), 0.0975);
  z-index: 5;
`;

const List = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;

const LFatText = styled(FatText)`
  margin-left: 10px;
`;

const LLink = styled(Link)`
  color: inherit;
`;

const LogOut = styled(List)`
  box-sizing: border-box;
  border-top: 1px solid rgba(var(--b38, 219, 219, 219), 1);
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export default withRouter(({ history }) => {
  const [drop, setDrop] = useState("");
  const search = useInput("");
  const { data } = useQuery(ME);
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };
  const [logOut, { loading: oLoading }] = useMutation(LOG_OUT);

  return (
    <>
      {oLoading && <Loader />}
      <Header>
        <HeaderWrapper>
          <HeaderColumn>
            <Link to="/">
              <Logo />
            </Link>
          </HeaderColumn>
          <HeaderColumn>
            <form onSubmit={onSearchSubmit}>
              <SearchInput
                value={search.value}
                onChange={search.onChange}
                placeholder="Search"
              />
            </form>
          </HeaderColumn>
          <HeaderColumn>
            <HeaderBtn>
              <Link to="/message">
                <Message />
              </Link>
            </HeaderBtn>
            <HeaderBtn>
              <Link to="/explore">
                <Compass />
              </Link>
            </HeaderBtn>
            <HeaderBtn
              onClick={
                drop === "empty" ? () => setDrop("") : () => setDrop("empty")
              }
            >
              <HeartEmpty />
              {drop === "empty" && (
                <>
                  <Background onClick={() => setDrop("")} />
                  <DropDown></DropDown>
                </>
              )}
            </HeaderBtn>
            {data && data.me ? (
              <HeaderBtn
                onClick={
                  drop === "user" ? () => setDrop("") : () => setDrop("user")
                }
              >
                <User />
                {drop === "user" && (
                  <>
                    <Background onClick={() => setDrop("")} />
                    <DropDown>
                      <LLink to={data.me.name}>
                        <List>
                          <Profile />
                          <LFatText text="Profile" />
                        </List>
                      </LLink>
                      <LLink to="setting">
                        <List>
                          <Setting />
                          <LFatText text="Setting" />
                        </List>
                      </LLink>
                      <LogOut onClick={logOut}>
                        <FatText text="Log Out" />
                      </LogOut>
                    </DropDown>
                  </>
                )}
              </HeaderBtn>
            ) : (
              <HeaderBtn>
                <Link to="/#">
                  <User />
                </Link>
              </HeaderBtn>
            )}
          </HeaderColumn>
        </HeaderWrapper>
      </Header>
    </>
  );
});
