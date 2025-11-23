import { useCallback, useEffect, useState } from "react";
import { CheeseCell, EndCell, MapBlockEmpty, MapBlockVisited, StartCell, Burned } from "./MapBlock";
import {CheckWin,Corrds1D_2D,Corrds2D_1D, RandomMoves, START, END, WALLS, CHEESE, CanResolve, explore, CheesesAround, HAMBURGUER, MeetCanCollect } from "./CheckWin";
import "./Match.css";
const SAMES_BOARD = 4
let BoardCompleted = 0
let path = []

function generateBoard(boardSize, cheeseNumber) {
  const yStart = Math.round(Math.random() * (boardSize - 1));  // Line of start cell
  const start = boardSize * yStart;
  const end = boardSize - 1 + boardSize * ((Math.round(boardSize / 2) + yStart) % boardSize);
  let newBoard = Array(boardSize * boardSize).fill(0).map((x, i) => (i === start ? START : x)).map((x, i) => (i === end ? END : x));
  let SavePath = [start];
  const cheesePointers = Array.from({ length: cheeseNumber }, function generateCheeses () {
    let randomPoint = Math.floor(Math.random() * (boardSize * boardSize));
    for (; randomPoint === start || randomPoint === end; randomPoint = Math.floor(Math.random() * (boardSize * boardSize))){}
    return randomPoint;
  });
  SavePath.push(...new Set(cheesePointers));
  SavePath.push(end);
  SavePath = SavePath.map((x) => Corrds1D_2D(x, boardSize, boardSize));
  let HamburguerCells = [];
  for (var i = 1; i < SavePath.length; i++) {
    if (i % 2 === 0)
      HamburguerCells.push(...RandomMoves(newBoard,SavePath[i - 1],[0, 10, 20],boardSize,SavePath[i]));
    else
      HamburguerCells.push(...explore(newBoard,SavePath[i - 1],[0, 10, 20],boardSize,SavePath[i]));
  }
  HamburguerCells = HamburguerCells.map((x) => Corrds2D_1D(x.y, x.x, boardSize));


  return newBoard.map((x,i) => {
    if (i === start || i === end) return x
    if (!HamburguerCells.includes(i)){
      return (Math.random() > 0.25) ? -1 : x
    }
    if (cheesePointers.includes(i)) return CHEESE
    else return x
  });
}

export function Board({ score, setScore, setFoods, setMeets, setMinMeets }) {
  const [Board, setBoard] = useState([]);
  const [boardSize, setBoardSize] = useState(4)
  const Lines = boardSize;
  const LinesNumber = (boardSize * boardSize) / Lines;

  useEffect((
    () => {
      const cheeseCollects = []
      const newfoods = []
      for(const cell of path){
        newfoods.push(HAMBURGUER)
        for(var cheeseCell of CheesesAround(Board,cell,boardSize).filter((x) => !cheeseCollects.includes(x))){
          newfoods.push(CHEESE)
          cheeseCollects.push(cheeseCell)
        }
      }
      setFoods(newfoods)
    }
  ),[Board,boardSize,setFoods])


  const tryCreateNewBoard = useCallback(() => {
    path = []
    const newBoard = generateBoard(boardSize, boardSize - 4);
    if (CanResolve(newBoard,boardSize)){
      setBoard(newBoard)
      setMeets(MeetCanCollect(newBoard,boardSize))
      setMinMeets(explore(newBoard,Corrds1D_2D(newBoard.indexOf(START),boardSize,boardSize),[START,HAMBURGUER,END],boardSize,Corrds1D_2D(newBoard.indexOf(END),boardSize,boardSize)).length - 2)
    }
    else setTimeout(() => tryCreateNewBoard(),0)
  })

  useEffect(() => tryCreateNewBoard(), [boardSize]);

  const updateBoard = (id) => {
    const newValue = Board[id] === 0 ? 1 : 0;
    if (newValue === 1) path.push(id)
    else path = path.filter((x) => x !== id)
    setBoard(
      Board.map((x, i) => {
        return i === id ? newValue : x;
      }),
    );
  };

  useEffect(() => {
    if (CheckWin(Board, boardSize)) {
      setScore(score + 100);
      BoardCompleted++
      if (BoardCompleted % SAMES_BOARD !== 0){
        tryCreateNewBoard()
        return
      }
      if (boardSize < 9) setBoardSize(boardSize + 1);
      else tryCreateNewBoard();
    }
  }, [Board]);

  const dynamicStyle = {
    width: 100 / LinesNumber - 2 + "%"
  };

  return (
    <div className="Board">
      {
        Board.map((x,i) => {
          switch (x){
            case START:
              return <StartCell style={dynamicStyle} />
            case END:
              return <EndCell style={dynamicStyle} />
            case WALLS:
              return <Burned style={dynamicStyle}/>
            case CHEESE:
              return <CheeseCell style={dynamicStyle}/>
            default:
              return (x === 1) ? <MapBlockVisited onClick={() => updateBoard(i)} style={dynamicStyle} /> : <MapBlockEmpty onClick={() => updateBoard(i)} style={dynamicStyle} />
          }
        })
      }
    </div>
  );
}