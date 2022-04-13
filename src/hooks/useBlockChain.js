import { useState } from 'react';
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
  var getDeployInterval = null;
 
  window.addEventListener("signer:locked", (msg) => { });
  window.addEventListener("signer:unlocked", (msg) => { 
    getActiveKey()
  });
  window.addEventListener("signer:activeKeyChanged", (msg) => { 
    logout();
  });


  async function getActiveKey() {
    const isConnected = await Signer.isConnected();
    if (isConnected) {
      if (activeKey == null) {
        try {
          activeKey = await Signer.getActivePublicKey();
          setPlayerName(activeKey.substring(0,5) + "..." + activeKey.substring(activeKey.length-5,activeKey.length));
          getAccountBalance();
        } catch (error) {
          Signer.sendConnectionRequest();
        }
      } else {
        getAccountBalance();
      }
    } else {
      Signer.sendConnectionRequest();
    }
  }

  async function getAccountBalance(){
    try {
      let stateRootHash = await casperService.getStateRootHash();
      try {
        let accountBalanceUref = await casperService.getAccountBalanceUrefByPublicKey(stateRootHash, CLPublicKey.fromHex(activeKey));
        let accountBalance = await casperService.getAccountBalance(stateRootHash, accountBalanceUref);
        setBalance(accountBalance/10**9);
        getBestScore();
      } catch(error) {
        alert(error.message);
      }
    } catch(error) {
      alert(error.message);
    } 
  }

  async function getBestScore(){
    try {
      let stateRootHash = await casperService.getStateRootHash();
      try {
        setBestScore(0);
        const result = await casperService.getBlockState(
          stateRootHash,
          'account-hash-ad15b0ac431f0ba4bd9ee8461bb17fd0fe4327c0208094bd65b258702c98dbd6',
          ['contract']
        );
        var obj = JSON.parse(JSON.stringify(result));
            
        for (let i = 0; i < obj.Contract.namedKeys.length; i++) {
          if (obj.Contract.namedKeys[i].name == activeKey) {
            const scoresData = await casperService.getBlockState(
              stateRootHash,
              'account-hash-ad15b0ac431f0ba4bd9ee8461bb17fd0fe4327c0208094bd65b258702c98dbd6',
              ['contract',obj.Contract.namedKeys[i].name]
            );
            setBestScore(parseInt((JSON.parse(JSON.stringify(scoresData)).CLValue.data).split(';')[2]));
          }
        } 
      } catch(error) {
        setBestScore(0);
        //alert(error.message);
      }
    } catch(error) {
      setBestScore(0);
      //alert(error.message);
    }  
  }

  function checkDeployStatus() {
    getDeployInterval = setInterval(() => {
      getDeployResult();
    }, 5000);
  }

  async function getDeployResult() {
    try {
      const deployInfo = await casperService.getDeployInfo(deployHash);
      if (JSON.parse(JSON.stringify(deployInfo)).execution_results.length == 1) {
        clearInterval(getDeployInterval);
        if (JSON.parse(JSON.stringify(deployInfo)).execution_results[0].result.hasOwnProperty("Success")) {
          getAccountBalance()
          document.getElementById("msgPublishingResult").innerHTML = "Success!";
          setIsPublishedResult(true);
        } else {
          document.getElementById("msgPublishingResult").innerHTML = JSON.stringify(JSON.parse(JSON.stringify(deployInfo)).execution_results[0].result.Failure.error_message);
        }        
      }
    } catch(error) {
      alert(error.message);
    } 
  }

  async function publishResult(){
    setIsError(false);
    
    try {
      activeKey = await Signer.getActivePublicKey();
    } catch (error) {
      Signer.sendConnectionRequest();
      return;
    }

    setIsPublishingResult(true);

    try {
      const contractHash = decodeBase16('fc79928764659799f1f395ace799fad3b55c142bc18dd1a9e9946d4c5aa25aa0');
      const deployParams = new DeployUtil.DeployParams(CLPublicKey.fromHex(activeKey), 'casper-test');

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
  

  return [playerName, balance, network, bestScore, getActiveKey, publishResult];
};
