export const TETROMINOS = {
  0: { 
    shape: [[0]], 
    color: '0, 0, 0, 0',
    border_color: '0, 0, 0, 0'},
  I: {
    shape: [[0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0]],
    color: '80, 227, 230, 1',
    border_color: '0, 0, 0, 0.3'},
  J: { 
    shape: [[0, 'J', 0], [0, 'J', 0], ['J', 'J', 0]], 
    color: '0, 180, 244, 1',
    border_color: '0, 124, 198, 1'},
  L: {
    shape: [[0, 'L', 0], [0, 'L', 0], [0, 'L', 'L']],
    color: '245, 129, 0, 1',
    border_color: '221, 67, 0, 1'},
  O: { 
    shape: [['O', 'O'], ['O', 'O']], 
    color: '243, 211, 1, 1',
    border_color: '202, 154, 2, 1'},
  S: { 
    shape: [[0, 'S', 'S'], ['S', 'S', 0], [0, 0, 0]], 
    color: '155, 212, 2, 1',
    border_color: '103, 161, 5, 1'},
  T: {
    shape: [[0, 0, 0], ['T', 'T', 'T'], [0, 'T', 0]],
    color: '245, 20, 253, 1',
    border_color: '166, 0, 201, 1'},
  Z: { 
    shape: [['Z', 'Z', 0], [0, 'Z', 'Z'], [0, 0, 0]], 
    color: '253, 15, 116, 1',
    border_color: '199, 0, 74, 1'},
};

export const randomTetromino = () => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino = tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};
