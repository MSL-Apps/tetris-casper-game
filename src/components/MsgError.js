import React from 'react';
import styled from 'styled-components';

const StyledMsgError = styled.div`
  height: auto;
  width: 80%;
  text-align: center;
  color: #fd0e73ff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8vw;
  background: #ffffffdd;
  border-radius: 0.6vw;
  border: 0.15vw solid #fd0e73dd;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  padding-top: 1vw;
  padding-bottom: 1vw;
  position: relative;
`;

const MsgError = () => (
  <StyledMsgError id="msgError"></StyledMsgError>
);

export default MsgError;
