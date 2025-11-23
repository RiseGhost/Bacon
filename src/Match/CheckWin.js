export const START = 10, END = 20, CHEESE = 5, WALLS = -1, HAMBURGUER = 0, HAMBURGUER_VOID = 1

export function Corrds1D_2D(index, lines, columns) {
  return { x: index % columns, y: Math.floor(index / lines) };
}

export function Corrds2D_1D(line, column, elementsByLine) {
  return line * elementsByLine + column;
}

export function CheesesAround(board,index,boardSize){
  var coord = Corrds1D_2D(index,boardSize,boardSize)
  const possibilities = [
    {x: coord.x + 1, y: coord.y},
    {x: coord.x - 1, y: coord.y},
    {x: coord.x, y: coord.y + 1},
    {x: coord.x, y: coord.y - 1},
  ].filter((c) => c.x >= 0 && c.x < boardSize && c.y >= 0 && c.y < boardSize && board[Corrds2D_1D(c.y,c.x,boardSize)] === CHEESE)
  return possibilities.map((x) => Corrds2D_1D(x.y,x.x,boardSize))
}

const posToString = (pos) => `(${pos.x},${pos.y})`;

const isValid = (board,pos,n,moveChunks,visited) => {
  return (
    pos.x < n && pos.x >= 0 && pos.y < n && pos.y >= 0 &&
    moveChunks.includes(board[Corrds2D_1D(pos.y, pos.x, n)]) &&
    !visited.includes(posToString(pos))
  );
};

export function explore(board, startPost, moveChunks, n, targetPos) {
  if (board.length === 0) return [];
  let stack = [[startPost]];

  while (stack.length > 0) {
    const path = stack.shift();
    const pos = path.at(-1);

    if (pos.x === targetPos.x && pos.y === targetPos.y) return path

    const moves = [
      { x: pos.x, y: pos.y + 1 },
      { x: pos.x, y: pos.y - 1 },
      { x: pos.x + 1, y: pos.y },
      { x: pos.x - 1, y: pos.y },
    ].filter((x) => isValid(board,x,n,moveChunks,path.map((x) => posToString(x))));
    for (const next of moves) {
      stack.push([...path, next]);
    }
  }
  return [];
}

export function RandomMoves(board, startPos, moveChunks, n, targetpos){
  if (board.length === 0) return []
  let pos = startPos
  let visited = [posToString(pos)]
  let interactions = 100 // Controlle the max interactions in while loop
  const path = [pos]


  while(path.length > 0){
    if (interactions <= 0) return explore(board,startPos,moveChunks,n,targetpos)
    const moves = [
      {x: pos.x + 1, y: pos.y},
      {x: pos.x - 1, y: pos.y},
      {x: pos.x, y: pos.y + 1},
      {x: pos.x, y: pos.y - 1},
      ].filter((x) => isValid(board,x,n,moveChunks,visited))
    if (moves.length === 0){
      pos = path.shift()
      continue
    }
    const randomMove = moves[Math.floor(Math.random() * moves.length)]
    pos = randomMove
    if (pos.x === targetpos.x && pos.y === targetpos.y) {
      path.push(pos)
      return (path.length > board.length/3) ? explore(board,startPos,moveChunks,n,targetpos) : path
    }
    path.push(pos)
    visited.push(posToString(pos))
    interactions--
  }
  return (path.length > board.length/3) ? explore(board,startPos,moveChunks,n,targetpos) : path
}

function CheckCheese(board, n){
  if (board.indexOf(CHEESE) === -1) return false
  let cheese = Corrds1D_2D(board.indexOf(CHEESE),n,n)
  let start = Corrds1D_2D(board.indexOf(START),n,n)
  return explore(board, start, [START,HAMBURGUER,CHEESE], n, cheese).length > 0
}

// n -> board size 9x9
// Return the number of Meet, player can collect
export function MeetCanCollect(board, n){
  const visited = []
  var pos = Corrds1D_2D(board.indexOf(START),n,n)

  const backtrack = (pos) => {
    const moves = [
      {x: pos.x + 1, y: pos.y},
      {x: pos.x - 1, y: pos.y},
      {x: pos.x, y: pos.y + 1},
      {x: pos.x, y: pos.y - 1},
    ].filter((x) => isValid(board,x,n,[HAMBURGUER],visited))
    if (!visited.includes(posToString(pos))) visited.push(posToString(pos))
    for (var coord of moves){ backtrack(coord) }
  }
  backtrack(pos)
  return visited.filter((x) => x !== posToString(pos)).length
}

export function CheckWin(board, n) {
  let pos = Corrds1D_2D(board.indexOf(START), n, n);
  return explore(board, pos, [HAMBURGUER_VOID, START, END], n, Corrds1D_2D(board.indexOf(END), n, n)).length > 0
}

export function CanResolve(board, n) {
  let pos = Corrds1D_2D(board.indexOf(START), n, n);
  const colectCheese = CheckCheese(board,n)
  const finish = explore(board, pos, [START, END, HAMBURGUER], n, Corrds1D_2D(board.indexOf(END), n, n))
  if (board.indexOf(CHEESE) === -1) return finish.length > 0
  return colectCheese && finish.length > 0
}
