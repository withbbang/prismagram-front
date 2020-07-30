import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({
  action,
  username,
  firstName,
  lastName,
  secret,
  email,
  setAction,
  onSubmit,
  rLoading,
  aLoading,
  sLoading,
  iLoading,
}) => {
  return (
    <>
      {(rLoading || aLoading || sLoading || iLoading) && <Loader />}
      <Wrapper>
        <Form>
          {action === "logIn" && (
            <>
              <Helmet>
                <title>Log In | Youngstagram</title>
              </Helmet>
              <form onSubmit={onSubmit}>
                <Input placeholder={"Email"} {...email} type="email" />
                <Button text={"Log In"} />
              </form>
            </>
          )}
          {action === "signUp" && (
            <>
              <Helmet>
                <title>Sign Up | Youngstagram</title>
              </Helmet>
              <form onSubmit={onSubmit}>
                <Input placeholder={"Firstname"} {...firstName} />
                <Input placeholder={"Lastname"} {...lastName} />
                <Input placeholder={"Email"} {...email} type="email" />
                <Input placeholder={"Username"} {...username} />
                <Button text={"Sign Up"} />
              </form>
            </>
          )}
          {action === "confirm" && (
            <>
              <Helmet>
                <title>Confrim Secret | Youngstagram</title>
              </Helmet>
              <form onSubmit={onSubmit}>
                <Input placeholder="Paste your secret" required {...secret} />
                <Button text="Confirm" />
              </form>
            </>
          )}
        </Form>
        {action !== "confirm" && (
          <StateChanger>
            {action === "logIn" ? (
              <>
                Don't have an account?{" "}
                <Link onClick={() => setAction("signUp")}>Sign up</Link>
              </>
            ) : (
              <>
                Have an account?{" "}
                <Link onClick={() => setAction("logIn")}>Log in</Link>
              </>
            )}
          </StateChanger>
        )}
      </Wrapper>
    </>
  );
};
