import React, { useState } from 'react';
import {
  Signer,
  DeployUtil,
  CLPublicKey,
  CasperServiceByJsonRPC,
  decodeBase16,
  RuntimeArgs,
  CLString
} from 'casper-js-sdk';

export const useBlockChain = (level, rows, score, logout, isError, setIsError, isPublishingResult, setIsPublishingResult, isPublishedResult, setIsPublishedResult) => {

  const [casperNodeUrl, setCasperNodeUrl] = useState('http://138.201.122.209:7777/rpc'); 
  const [playerName, setPlayerName] = useState(''); 
  const [balance, setBalance] = useState(0); 
  const [network, setNetwork] = useState('casper-test');
  const [bestScore, setBestScore] = useState();

  var casperService = new CasperServiceByJsonRPC(casperNodeUrl);
  var activeKey = null;
  var deployHash = null;
  var getDeployResultInterval = null;
  var fetchScoresInterval = null;
 
  window.addEventListener("signer:locked", (msg) => { });
  window.addEventListener("signer:unlocked", (msg) => { 
    getActiveKey();  
  });
  window.addEventListener("signer:activeKeyChanged", (msg) => { 
    logout();
  });


  React.useEffect(() => {
    fetchScores();
    clearInterval(fetchScoresInterval);
    fetchScoresInterval = setInterval(() => fetchScores(), 10000);
  },[]);


  async function getActiveKey() {
    if (isPublishedResult) {
      const isConnected = await Signer.isConnected();
      if (isConnected) {
        if (activeKey == null) {
          try {
            activeKey = await Signer.getActivePublicKey();
            setPlayerName(activeKey.substring(0,5) + "..." + activeKey.substring(activeKey.length-5,activeKey.length));
            getBalance();
          } catch (error) {
            Signer.sendConnectionRequest();
          }
        } else {
          getBalance();
        }
      } else {
        Signer.sendConnectionRequest();
      }
    }
  }

  async function getBalance(){
    if (activeKey != null) {
      try {
        let stateRootHash = await casperService.getStateRootHash();
        try {
          let accountBalanceUref = await casperService.getAccountBalanceUrefByPublicKey(stateRootHash, CLPublicKey.fromHex(activeKey));
          try {
            let accountBalance = await casperService.getAccountBalance(stateRootHash, accountBalanceUref);
            setBalance(accountBalance/10**9);
            getBestScore();
          } catch(error) {
            alert('getAccountBalance: ' + error.message);
          }
        } catch(error) {
          alert('getAccountBalanceUrefByPublicKey: ' + error.message);
        }
      } catch(error) {
        alert('getStateRootHash: ' + error.message);
      } 
    }
  }

  async function getBestScore(){
    try {
      let stateRootHash = await casperService.getStateRootHash();
      try {
        setBestScore(0);
        const result = await casperService.getBlockState(
          stateRootHash,
          'account-hash-4740c2eedd3711705dbfb46f831f226ad7384dd303ffa452e08a5c8146128bf1',
          ['tetris-casper']
        );
        var obj = JSON.parse(JSON.stringify(result));
            
        for (let i = 0; i < obj.Contract.namedKeys.length; i++) {
          if (obj.Contract.namedKeys[i].name == activeKey) {
            const scoresData = await casperService.getBlockState(
              stateRootHash,
              'account-hash-4740c2eedd3711705dbfb46f831f226ad7384dd303ffa452e08a5c8146128bf1',
              ['tetris-casper',obj.Contract.namedKeys[i].name]
            );
            setBestScore(parseInt((JSON.parse(JSON.stringify(scoresData)).CLValue.data).split(';')[2]));
          }
        } 
      } catch(error) {
        setBestScore(0);
        alert('getBlockState: ' + error.message);
      }
    } catch(error) {
      setBestScore(0);
      alert('getStateRootHash: ' + error.message);
    }  
  }

  async function fetchScores() {
    try {
      let stateRootHash = await casperService.getStateRootHash();
      try {
        const result = await casperService.getBlockState(
          stateRootHash,
          'account-hash-4740c2eedd3711705dbfb46f831f226ad7384dd303ffa452e08a5c8146128bf1',
          ['tetris-casper']
        );
        var obj = JSON.parse(JSON.stringify(result));
        var scoreBoard = [];
        var str = "<table>";
    
        for (let i = 0; i < obj.Contract.namedKeys.length; i++) {
          const scoresData = await casperService.getBlockState(
            stateRootHash,
            'account-hash-4740c2eedd3711705dbfb46f831f226ad7384dd303ffa452e08a5c8146128bf1',
            ['tetris-casper',obj.Contract.namedKeys[i].name]
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
          if (i===9) { break }
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


  function checkDeployStatus() {
    getDeployResultInterval = setInterval(() => {
      getDeployResult();
    }, 5000);
  }

  async function getDeployResult() {
    try {
      const deployInfo = await casperService.getDeployInfo(deployHash);
      if (JSON.parse(JSON.stringify(deployInfo)).execution_results.length == 1) {
        clearInterval(getDeployResultInterval);
        if (JSON.parse(JSON.stringify(deployInfo)).execution_results[0].result.hasOwnProperty("Success")) {
          getBalance()
          document.getElementById("msgPublishingResult").innerHTML = "Success!";
          setIsPublishedResult(true);
        } else {
          document.getElementById("msgPublishingResult").innerHTML = JSON.stringify(JSON.parse(JSON.stringify(deployInfo)).execution_results[0].result.Failure.error_message);
        }        
      }
    } catch(error) {
      alert('getDeployResult: ' + error.message);
    } 
  }

  async function publishResult(){
    setIsError(false);
    
    try {
      activeKey = await Signer.getActivePublicKey();
    } catch (error) {
      setIsError(true);
      document.getElementById("msgError").innerHTML = error.message;
      Signer.sendConnectionRequest();
      return;
    }

    setIsPublishingResult(true);

    try {
      const contractHash = decodeBase16('5b75a04325b499efce5090e6ae27564a9cc3b8af2874a32ff64e657595d29fd0');
      const deployParams = new DeployUtil.DeployParams(CLPublicKey.fromHex(activeKey), network);

      const args = RuntimeArgs.fromMap({
        'account': new CLString(activeKey),
        'result': new CLString(level + ';' + rows + ';' + score)
      });

      const session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
        contractHash,
        "store_result",
        args
      )

      const deploy = DeployUtil.makeDeploy(
        deployParams,
        session,
        DeployUtil.standardPayment(25000000000)
      );

      const deployJSON = DeployUtil.deployToJson(deploy);
      const signedDeployJSON = await Signer.sign(deployJSON, activeKey);
      const signedDeploy = DeployUtil.deployFromJson(signedDeployJSON).unwrap();
      const deployResult = await casperService.deploy(signedDeploy);
      deployHash = JSON.parse(JSON.stringify(deployResult)).deploy_hash;
      checkDeployStatus();        
    
    } catch(error) {
      setIsError(true);
      document.getElementById("msgError").innerHTML = error.message;
    }
  }
  

  return [playerName, balance, network, bestScore, fetchScores, getActiveKey, publishResult];
};
