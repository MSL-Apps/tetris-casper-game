import React, { useState } from 'react';
import tetris from '../img/tetris.png'
import { createBoard, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useBoard } from '../hooks/useBoard';
import { useGameStatus } from '../hooks/useGameStatus';
import { useBlockChain } from '../hooks/useBlockChain';

import Board from './Board';
import ProfileView from './ProfileView';
import ResultView from './ResultView';
import ScoreBoardView, { fetchScores } from './ScoreBoardView';
import ControlView from './ControlView';

import MsgLoginDisplay from './MsgLoginDisplay';
import MsgContinue from './MsgContinue';
import MsgPublish from './MsgPublish';
import MsgPublishingResult from './MsgPublishingResult';
import MsgError from './MsgError';

import LoginButton from './LoginButton';
import StartButton from './StartButton';
import PublishButton from './PublishButton';


const Tetris = () => {

  const [dropTime, setDropTime] = useState(null);
  const [gameInit, setGameInit] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [gamePaused, setGamePaused] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isBetterResult, setIsBetterResult] = useState(false);
  const [isPublishedResult, setIsPublishedResult] = useState(true);
  const [isPublishingResult, setIsPublishingResult] = useState(false);
    
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [board, setBoard, rowsCleared] = useBoard(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  const [playerName, balance, network, bestScore, getActiveKey, publishResult] = useBlockChain(level, rows, score, logout, isError, setIsError, isPublishingResult, setIsPublishingResult, isPublishedResult, setIsPublishedResult);

  const movePlayer = dir => {
    if (!checkCollision(player, board, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  function logout() {
    window.location.reload(false);
  }

  const startGameActivity = () => {
    setBoard(createBoard());
    setDropTime(1000);
    resetPlayer();
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameInit(false);
    setGameOver(false);
    setIsPublishingResult(false);
  };
  
  const publishResultActivity = () => {
    publishResult();
  }

  const drop = () => {
    document.getElementById('main').focus();
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }
    if (!checkCollision(player, board, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 3) {
        setGameOver(true);
        if (score > bestScore) {
          setIsBetterResult(true);
          setIsPublishedResult(false);
        } else {
          setIsBetterResult(false);
          setIsPublishedResult(true);
        }
        setDropTime(null);
      } else {
        setDropTime(1000 / (level + 1));
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };
  
  fetchScores();
  useInterval(() => { drop(); }, dropTime);
  useInterval(() => { fetchScores(); }, 10000);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37 && !gamePaused) {
        movePlayer(-1);
      } else if (keyCode === 39 && !gamePaused) {
        movePlayer(1);
      } else if (keyCode === 40 && !gamePaused) {
        setDropTime(40);
      } else if (keyCode === 38 && !gamePaused) {
        playerRotate(board, 1);
      } else if (keyCode === 32) {
        if (gamePaused) {
          setGamePaused(false);
          setDropTime(1000 / (level + 1));
        } else {
          setGamePaused(true);
          setDropTime(null);
        }
      }
    }
  };

  return (
    <StyledTetrisWrapper id='main' role='button' tabIndex='0' onKeyDown={e => move(e)}>
      <StyledTetris>
        
        <div style={{ width: '100%', position: 'relative' }}>
          <div style={{ width: '100%', position: 'absolute', top: '2vw', left: '19vw' }}>
            <img style={{ height: '3.2vw'}} src={tetris}/>
          </div>
          <div style={{ width: '100%', position: 'absolute', top: '6.5vw', left: '19vw' }}>
            <ResultView score={score} rows={rows} level={level}/>
          </div>
          <div style={{ width: '100%', position: 'absolute', top: '32vw', left: '16.1vw' }}>
            <ScoreBoardView />
          </div>
        </div>
        
        <div style={{ width: '72vw', height: '100%', position: 'relative' }}>
          <Board board={board} />
          <div style={{ width: '100%', height: '100%', position: 'absolute', top: '0', left: '0' }}>
            { gamePaused ? <div style={{ width: '100%', marginTop: '40%', marginBottom: '20%', color: '#FFFFFFFF', fontSize: '2vw', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'center' }}>GAME PAUSED</div> : "" }
            { gameOver ? <div style={{ width: '100%', marginTop: '40%', marginBottom: '20%', color: '#FFFFFFFF', fontSize: '2vw', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'center' }}>GAME OVER</div> : "" }
            { gameInit ? <div style={{ width: '100%', marginTop: '40%', marginBottom: '20%', color: '#FFFFFFFF', fontSize: '2vw', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'center' }}>NEW GAME</div> : "" }
            { gameOver && !isBetterResult ? <MsgContinue /> : "" }
            { gameOver && isBetterResult && !isPublishingResult ? <MsgPublish /> : "" }
            { gameOver && isPublishingResult ? <MsgPublishingResult /> : "" }
            { isError ? <MsgError /> : "" }
            { (gameInit || gameOver) && playerName == '' ? <MsgLoginDisplay /> : "" }
            { (gameInit || gameOver) && playerName == '' ? <LoginButton callback={getActiveKey} /> : "" }
            { (gameInit || gameOver) && isPublishedResult && !playerName == '' ? <StartButton callback={startGameActivity} /> : "" }
            { gameOver && !isPublishedResult && (!isPublishingResult || isError)? <PublishButton callback={publishResultActivity} /> : "" }
          </div>
        </div>
        
        <div style={{ width: '100%', position: 'relative' }}>
          <div style={{ width: '100%', position: 'absolute', top: '0vw', left: '0.8vw' }}>
            <ProfileView playerName={playerName} balance={balance} network={network} bestScore={bestScore}/>
          </div>
          <div style={{ width: '100%', position: 'absolute', top: '7.2vw', left: '0.8vw' }}>
            <ControlView />
          </div>
        </div>
      
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
