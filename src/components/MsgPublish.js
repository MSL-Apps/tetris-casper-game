import React from 'react';
import styled from 'styled-components';

const StyledMsgPublish = styled.div`
  height: auto;
  width: 80%;
  text-align: center;
  color: #ffffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8vw;
  background: #7c49ae99;
  border-radius: 0.6vw;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  padding-top: 1vw;
  padding-bottom: 1vw;
  position: relative;
`;

const MsgPublish = () => (
  <StyledMsgPublish>Your actual result is better than previous.<br></br>It should be published on block-chain.</StyledMsgPublish>
);

export default MsgPublish;
