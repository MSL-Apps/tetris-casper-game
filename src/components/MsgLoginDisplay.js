import React from 'react';
import styled from 'styled-components';

const StyledMsgLoginDisplay = styled.div`
  height: auto;
  width: 80%;
  text-align: center;
  color: #ffffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8vw;
  background: #7c49ae99;
  border-radius: 0.6vw;
  margin-top: 20%;
  margin-left: 10%;
  margin-right: 10%;
  padding-top: 1vw;
  padding-bottom: 1vw;
  position: relative;
`;

const MsgLoginDisplay = () => (
  <StyledMsgLoginDisplay>Before starting a new game<br/>log in to your user account.<br/><br/>You must have Casper Signer<br/>installed in your browser.</StyledMsgLoginDisplay>
);

export default MsgLoginDisplay;
