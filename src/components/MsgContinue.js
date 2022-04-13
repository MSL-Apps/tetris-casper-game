import React from 'react';
import styled from 'styled-components';

const StyledMsgContinue = styled.div`
  height: auto;
  width: 80%;
  text-align: center;
  color: #ffffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8vw;
  background: #ffffff33;
  border-radius: 0.6vw;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  padding-top: 1vw;
  padding-bottom: 1vw;
  position: relative;
`;

const MsgContinue = () => (
  <StyledMsgContinue>Your previous result was better than actual.<br></br>Not need to be published on block-chain.</StyledMsgContinue>
);

export default MsgContinue;
