import React from 'react';
import styled from 'styled-components';

const StyledProfileView = styled.div`
  height: 8vw;
  width: 14vw;
  color: #ffffffff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.6vw;
`;

const ProfileView = ({ playerName, balance, network, bestScore }) => (
  <StyledProfileView>
    <div style={{ padding: '1vw', width: '14vw', height: '5.3vw', background: '#00000033', border: '0.15vw solid #00000033', borderRadius: '0.6vw' }}>
      <div style={{ paddingTop: '0vw' }}>
        <div style={{ width: '6vw', textAlign: 'left', float: 'left' }}>Player name</div>
        <div style={{ width: '8vw', textAlign: 'right', float: 'left' }}>{playerName}</div>
      </div>
      <br/>
      <div style={{ paddingTop: '0.5vw' }}>
        <div style={{ width: '6vw', textAlign: 'left', float: 'left' }}>Account balance</div>
        <div style={{ width: '8vw', textAlign: 'right', float: 'left' }}>{balance} CSPR</div>
      </div>
      <br/>
      <div style={{ paddingTop: '0.5vw' }}>
        <div style={{ width: '6vw', textAlign: 'left', float: 'left' }}>Casper network</div>
        <div style={{ width: '8vw', textAlign: 'right', float: 'left' }}>{network}</div>
      </div>
      <br/>
      <div style={{ paddingTop: '1.5vw' }}>
        <div style={{ width: '6vw', textAlign: 'left', float: 'left' }}>Best score</div>
        <div style={{ width: '8vw', textAlign: 'right', float: 'left' }}>{bestScore}</div>
      </div>
    </div>
  </StyledProfileView>
);

export default ProfileView;
