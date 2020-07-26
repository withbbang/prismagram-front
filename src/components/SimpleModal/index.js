import React from "react";
import styled from "styled-components";
import { Close } from "../Icons";

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
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 4px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 6;
  opcity: 1;
`;

const Buttons = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Button = styled.div`
  height: ${(props) => props.height};
  width: 100%;
  color: ${(props) => props.color};
  font-wight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-bottom: solid 1px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  &:last-child {
    border-bottom: none;
  }
`;

const File = styled.input`
  display: none;
`;

export default (props) => (
  <Modal>
    <CloseDiv onClick={props.handleModal}>
      <Close />
    </CloseDiv>
    <Background onClick={props.handleModal} />
    <Content width={props.width} height={props.height}>
      <Buttons>
        {props.type === "profile" && (
          <>
            <File type="file" ref={props.fileInput} onChange={props.onChange} />
            <Button height="33%" color="#0095f6" onClick={props.onClick}>
              Upload
            </Button>
            <Button onClick={props.onDelete} height="33%" color="#ed4956">
              Delete Current Photo
            </Button>
            <Button onClick={props.handleModal} height="33%">
              Cancel
            </Button>
          </>
        )}
      </Buttons>
    </Content>
  </Modal>
);
