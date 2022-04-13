import React from 'react';
import styled from 'styled-components';

const StyledPublishButton = styled.button`
  padding: 0.5vw;
  height: 2.5vw;
  width: 80%;
  border-radius: 1.25vw;
  border: none;
  color: white;
  background: #007bff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8vw;
  outline: none;
  cursor: pointer;
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
`;

const PublishButton = ({ callback }) => (
  <StyledPublishButton onClick={callback}>PUBLISH RESULT</StyledPublishButton>
);

export default PublishButton;
