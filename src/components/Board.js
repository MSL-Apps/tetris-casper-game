import React from 'react';
import { StyledBoard } from './styles/StyledBoard';

import Cell from './Cell';

const Board = ({ board }) => (
  <StyledBoard width={board[0].length} height={board.length}>
    {board.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
  </StyledBoard>
);

export default Board;
