import React from 'react';
import styled from 'styled-components';

const StyledControlView = styled.div`
  height: 7.6vw;
  width: 7vw;
  color: #ffffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.6vw;
  margin-top: 1vw;
`;

const ControlView = ({ score, rows, level }) => (
  <StyledControlView >
    <div style={{ padding: '1vw', width: '7vw', height: '5.5vw', background: '#00000033', border: '0.15vw solid #00000033', borderRadius: '0.6vw' }}>
      <div style={{ paddingTop: '0vw' }}>
        <div style={{ width: '3.5vw', textAlign: 'left', float: 'left' }}>UP</div>
        <div id="activeKey" style={{ width: '3.5vw', textAlign: 'left', float: 'left' }}>rotate</div>
      </div>
      <br/>
      <div style={{ paddingTop: '0.5vw' }}>
        <div style={{ width: '3.5vw', textAlign: 'left', float: 'left' }}>LEFT</div>
        <div id="accountBalance" style={{ width: '3.5vw', textAlign: 'left', float: 'left' }}>move left</div>
      </div>
      <br/>
      <div style={{ paddingTop: '0.5vw' }}>
        <div style={{ width: '3.5vw', textAlign: 'left', float: 'left' }}>RIGHT</div>
        <div id="accountNetwork" style={{ width: '3.5vw', textAlign: 'left', float: 'left' }}>move right</div>
      </div>
      <br/>
      <div style={{ paddingTop: '0.5vw' }}>
        <div style={{ width: '3.5vw', textAlign: 'left', float: 'left' }}>DOWN</div>
        <div id="accountNetwork" style={{ width: '3.5vw', textAlign: 'left', float: 'left' }}>drop down</div>
      </div>
      <br/>
      <div style={{ paddingTop: '0.5vw' }}>
        <div style={{ width: '3.5vw', textAlign: 'left', float: 'left' }}>SPACE</div>
        <div id="accountNetwork" style={{ width: '3.5vw', textAlign: 'left', float: 'left' }}>pause game</div>
      </div>
    </div>
  </StyledControlView>
);

export default ControlView;
