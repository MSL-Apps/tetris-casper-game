import React from 'react';
import styled from 'styled-components';
import { CasperServiceByJsonRPC } from 'casper-js-sdk';

const URL = 'http://138.201.122.209:7777/rpc';
var casperService = new CasperServiceByJsonRPC(URL);

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


export async function fetchScores() {
  try {
    let stateRootHash = await casperService.getStateRootHash();
    try {
      const result = await casperService.getBlockState(
        stateRootHash,
        'account-hash-ad15b0ac431f0ba4bd9ee8461bb17fd0fe4327c0208094bd65b258702c98dbd6',
        ['contract']
      );
      var obj = JSON.parse(JSON.stringify(result));
      var scoreBoard = [];
      var str = "<table>";
  
      for (let i = 0; i < obj.Contract.namedKeys.length; i++) {
        const scoresData = await casperService.getBlockState(
          stateRootHash,
          'account-hash-ad15b0ac431f0ba4bd9ee8461bb17fd0fe4327c0208094bd65b258702c98dbd6',
          ['contract',obj.Contract.namedKeys[i].name]
        );

        scoreBoard.push({
          name: obj.Contract.namedKeys[i].name.substring(0,5) + "..." + obj.Contract.namedKeys[i].name.substring(obj.Contract.namedKeys[i].name.length-5, obj.Contract.namedKeys[i].name.length), 
          level: parseInt((JSON.parse(JSON.stringify(scoresData)).CLValue.data).split(';')[0]),
          rows: parseInt((JSON.parse(JSON.stringify(scoresData)).CLValue.data).split(';')[1]),
          score: parseInt((JSON.parse(JSON.stringify(scoresData)).CLValue.data).split(';')[2])
        });
      } 

      var scoreBoardSorted = scoreBoard.sort((a, b) => (a.score < b.score) ? 1 : -1);

      for (let i = 0; i < scoreBoardSorted.length; i++) {
        str = str + "<tr>"
        str = str + "<td style='width: 1vw; text-align: center'>" + (i+1) + "</td>"
        str = str + "<td style='width: 6vw; text-align: center'>" + scoreBoardSorted[i].name + "</td>";
        str = str + "<td style='width: 3vw; text-align: center'>" + scoreBoardSorted[i].level + "</td>";
        str = str + "<td style='width: 3vw; text-align: center'>" + scoreBoardSorted[i].rows + "</td>";
        str = str + "<td style='width: 3vw; text-align: center'>" + scoreBoardSorted[i].score + "</td>";
        str = str + "</tr>"
      }
      str = str + "</table>"

      document.getElementById("scoreBoard").innerHTML = str;
    } catch(error) {
      document.getElementById("scoreBoard").innerHTML = error.message;
    }
  } catch(error) {
    document.getElementById("scoreBoard").innerHTML = error.message;
  }  
  
}


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
