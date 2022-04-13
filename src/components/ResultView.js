import React from 'react';
import styled from 'styled-components';

const StyledResultView = styled.div`
  padding: 1vw;
  height: 5.2vw;
  width: 10vw;
  color: #ffffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.4vw;
  
  border-radius: 0.6vw;
  margin-bottom: 5%;
`;

const ResultView = ({ level, rows, score }) => (
  <StyledResultView >
    <div style={{ width: '10vw', textAlign: 'center', fontSize: '2.2vw' }}>{level}</div>
    <div style={{ width: '10vw', textAlign: 'center', fontSize: '0.8vw', color: '#ffffff80' }}>Level</div>
    <br/>
    <div style={{ width: '10vw', textAlign: 'center', fontSize: '2.2vw' }}>{rows}</div>
    <div style={{ width: '10vw', textAlign: 'center', fontSize: '0.8vw', color: '#ffffff80' }}>Rows</div>
    <br/>
    <div style={{ width: '10vw', textAlign: 'center', fontSize: '2.2vw' }}>{score}</div>
    <div style={{ width: '10vw', textAlign: 'center', fontSize: '0.8vw', color: '#ffffff80' }}>Score</div>
  </StyledResultView>
);

export default ResultView;
