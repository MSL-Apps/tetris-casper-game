import React from 'react';
import styled from 'styled-components';

const StyledScoreBoardView = styled.div`
  padding: 1vw;
  height: 9.3vw;
  width: 16vw;
  color: #ffffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.6vw;
  background: #00000033;
  border: 0.15vw solid #00000033;
  border-radius: 0.6vw;
  margin-bottom: 5%;
`;

const ScoreBoardView = () => (
  <StyledScoreBoardView>
    <div style={{ paddingTop: '0vw' }}>
      <div style={{ width: '1vw', textAlign: 'center', float: 'left' }}>#</div>
      <div style={{ width: '6vw', textAlign: 'center', float: 'left' }}>Player</div>
      <div style={{ width: '3vw', textAlign: 'center', float: 'left' }}>Level</div>
      <div style={{ width: '3vw', textAlign: 'center', float: 'left' }}>Rows</div>
      <div style={{ width: '3vw', textAlign: 'center', float: 'left' }}>Score</div>
    </div>
    <div style={{ marginTop: '1vw', width: '16vw', height: '0.01vw', backgroundColor: '#fff' }}></div>
    <div id='scoreBoard' style={{ paddingTop: '0.4vw' }}></div>
  </StyledScoreBoardView>
);

export default ScoreBoardView;
