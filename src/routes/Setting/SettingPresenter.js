import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import Loader from "../../components/Loader";
import FatText from "../../components/FatText";
import Input from "../../components/Input";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import SimpleModal from "../../components/SimpleModal";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 20px 40px 50px;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  padding: 10px 0;
  align-items: start;
  justify-content: space-around;
  &:last-child {
    width: 50%;
    min-height: 40px;
    align-self: center;
  }
`;

const Title = styled.div`
  margin-right: 32px;
  margin-left: auto;
`;

const LFatText = styled(FatText)`
  font-size: 20px;
`;

const LInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  width: 70%;
  min-height: 40px;
  border-radius: 3px;
  font-size: 14px;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
    color: #a4a4a4;
  }
`;

const Textarea = styled(TextareaAutosize)`
  border: ${(props) => props.theme.boxBorder};
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  width: 70%;
  min-height: 70px;
  max-height: 100px;
  border-radius: 3px;
  resize: none;
  font-size: 14px;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
    color: #a4a4a4;
  }
  &:focus {
    outline: none;
  }
`;

const TopDiv = styled.div`
  width: 70%;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LButton = styled(Button)`
  max-width: 30%;
`;

const SettingPresenter = ({
  modal,
  setModal,
  data,
  loading,
  uLoading,
  pLoading,
  name,
  email,
  firstName,
  lastName,
  bio,
  avatar,
  onSubmit,
  onChange,
  onClick,
  onDelete,
  fileInput,
}) => {
  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        {(uLoading || pLoading) && <Loader />}
        {modal && (
          <SimpleModal
            handleModal={() => setModal(!modal)}
            width="20%"
            height="15%"
            type="profile"
            fileInput={fileInput}
            onChange={onChange}
            onClick={onClick}
            onDelete={onDelete}
          />
        )}
        <Wrapper>
          <InnerWrapper>
            <Section>
              <Title>
                <Avatar size="md" url={avatar.value} />
              </Title>
              <TopDiv>
                <LFatText text={`${firstName.value} ${lastName.value}`} />
                <LButton text="Change Photo" onClick={() => setModal(!modal)} />
              </TopDiv>
            </Section>
            <Section>
              <Title>
                <LFatText text="Name" />
              </Title>
              <LInput
                placeholder="Name"
                value={name.value}
                onChange={name.onChange}
              />
            </Section>
            <Section>
              <Title>
                <LFatText text="Email" />
              </Title>
              <LInput
                placeholder="Email"
                value={email.value}
                onChange={email.onChange}
              />
            </Section>
            <Section>
              <Title>
                <LFatText text="FirstName" />
              </Title>
              <LInput
                placeholder="FirstName"
                value={firstName.value}
                onChange={firstName.onChange}
              />
            </Section>
            <Section>
              <Title>
                <LFatText text="LastName" />
              </Title>
              <LInput
                placeholder="LastName"
                value={lastName.value}
                onChange={lastName.onChange}
              />
            </Section>
            <Section>
              <Title>
                <LFatText text="Bio" />
              </Title>
              <Textarea
                placeholder="Bio"
                value={bio.value}
                onChange={bio.onChange}
              />
            </Section>
            <Section>
              <Button text="Change Profile" onClick={onSubmit} />
            </Section>
          </InnerWrapper>
        </Wrapper>
      </>
    );
  }
};

export default SettingPresenter;
