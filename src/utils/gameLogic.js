// Helper to transpose matrix (columns become rows)
export const transpose = (matrix) => {
  const size = matrix.length;
  const result = Array(size).fill(0).map(() => Array(size).fill(0));
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      result[c][r] = matrix[r][c];
    }
  }
  return result;
};

// Helper to reverse each row in a matrix
export const reverseRows = (matrix) => {
  return matrix.map(row => [...row].reverse());
};

// Helper to check if two boards are identical
export const isBoardEqual = (boardA, boardB) => {
  if (!boardA || !boardB) return false;
  if (boardA.length !== boardB.length) return false;
  for (let r = 0; r < boardA.length; r++) {
    for (let c = 0; c < boardA[r].length; c++) {
      if (boardA[r][c] !== boardB[r][c]) return false;
    }
  }
  return true;
};

// Find all empty cells in the board
export const getEmptyCells = (board) => {
  const cells = [];
  const size = board.length;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) {
        cells.push({ row: r, col: c });
      }
    }
  }
  return cells;
};

// Create a new board of given size, filled with zeros
export const createEmptyBoard = (size) => {
  return Array(size).fill(0).map(() => Array(size).fill(0));
};

// Add a random tile (2 with 90% probability, 4 with 10%)
export const addRandomTile = (board) => {
  const emptyCells = getEmptyCells(board);
  if (emptyCells.length === 0) return board;

  const newBoard = board.map(row => [...row]);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const { row, col } = emptyCells[randomIndex];
  
  // Spawn 2 (90% chance) or 4 (10% chance)
  newBoard[row][col] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
};

// Initialize board with two random tiles
export const initBoard = (size) => {
  let board = createEmptyBoard(size);
  board = addRandomTile(board);
  board = addRandomTile(board);
  return board;
};

// Slide and merge left for a single row
const slideRowLeft = (row, mode) => {
  // 1. Filter out zeros
  const line = row.filter(val => val !== 0);
  const newRow = [];
  let scoreAdded = 0;
  let i = 0;

  // 2. Merge matching adjacent tiles
  while (i < line.length) {
    if (i + 1 < line.length && line[i] === line[i + 1]) {
      let mergedVal;
      if (mode === 'evenSteps') {
        // Even Steps: 2->4, 4->6, 6->8, 8->10, etc. (X + 2)
        mergedVal = line[i] + 2;
      } else {
        // Classic: 2->4, 4->8, 8->16, etc. (X * 2)
        mergedVal = line[i] * 2;
      }
      newRow.push(mergedVal);
      scoreAdded += mergedVal;
      i += 2; // skip the next tile since it merged
    } else {
      newRow.push(line[i]);
      i++;
    }
  }

  // 3. Fill the remaining space with zeros
  while (newRow.length < row.length) {
    newRow.push(0);
  }

  return { newRow, scoreAdded };
};

// Slide and merge entire board LEFT
export const slideLeft = (board, mode) => {
  let scoreAdded = 0;
  const newBoard = board.map(row => {
    const { newRow, scoreAdded: rowScore } = slideRowLeft(row, mode);
    scoreAdded += rowScore;
    return newRow;
  });

  const moved = !isBoardEqual(board, newBoard);
  return { newBoard, scoreAdded, moved };
};

// Slide and merge RIGHT
export const slideRight = (board, mode) => {
  const reversed = reverseRows(board);
  const { newBoard: slidReversed, scoreAdded, moved } = slideLeft(reversed, mode);
  const newBoard = reverseRows(slidReversed);
  return { newBoard, scoreAdded, moved };
};

// Slide and merge UP
export const slideUp = (board, mode) => {
  const transposed = transpose(board);
  const { newBoard: slidTransposed, scoreAdded, moved } = slideLeft(transposed, mode);
  const newBoard = transpose(slidTransposed);
  return { newBoard, scoreAdded, moved };
};

// Slide and merge DOWN
export const slideDown = (board, mode) => {
  const transposed = transpose(board);
  const reversed = reverseRows(transposed);
  const { newBoard: slidReversed, scoreAdded, moved } = slideLeft(reversed, mode);
  const revertedReversed = reverseRows(slidReversed);
  const newBoard = transpose(revertedReversed);
  return { newBoard, scoreAdded, moved };
};

// General slide helper based on swipe direction
export const moveBoard = (board, direction, mode) => {
  switch (direction) {
    case 'LEFT':
      return slideLeft(board, mode);
    case 'RIGHT':
      return slideRight(board, mode);
    case 'UP':
      return slideUp(board, mode);
    case 'DOWN':
      return slideDown(board, mode);
    default:
      return { newBoard: board, scoreAdded: 0, moved: false };
  }
};

// Check if game is over (no empty spaces and no adjacent merges possible)
export const isGameOver = (board, mode) => {
  const size = board.length;
  
  // 1. Check for any empty cells
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) return false;
    }
  }

  // 2. Check horizontal merges
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size - 1; c++) {
      if (board[r][c] === board[r][c + 1]) return false;
    }
  }

  // 3. Check vertical merges
  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === board[r + 1][c]) return false;
    }
  }

  return true;
};

// Check if player has won (reached target score/tile)
export const checkWinCondition = (board, mode, targetValue = 2048) => {
  const size = board.length;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] >= targetValue) {
        return true;
      }
    }
  }
  return false;
};
