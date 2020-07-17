import React from "react";
import styled, { keyframes } from "styled-components";
import { Loading } from "./Icons";

const Animation = keyframes`
    0%{
      transform: rotate(0deg);
    }
    10%{
      transform: rotate(36deg);
    }
    20%{
      transform: rotate(72deg);
    }
    30%{
      transform: rotate(108deg);
    }
    40%{
      transform: rotate(144deg);
    }
    50%{
      transform: rotate(180deg);
    }
    60%{
      transform: rotate(216deg);
    }
    70%{
      transform: rotate(252deg);
    }
    80%{
      transform: rotate(288deg);
    }
    90%{
      transform: rotate(324deg);
    }
    100%{
        opacity:0;
    };
`;

const Loader = styled.div`
  animation: ${Animation} 1s linear infinite;
  text-align: center;
`;

const Screen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

export default () => (
  <Screen>
    <Background />
    <Loader>
      <Loading />
    </Loader>
  </Screen>
);
