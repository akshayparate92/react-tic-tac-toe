
import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver.jsx";
import Player from "./components/Player";
import Log from "./components/Log";
import WINNING_COMBINATION from "./winning-combinations.js";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}
let INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];
function derivedActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length >0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
    return currentPlayer;
}
function derivedGameBoard(gameTurns){
  const gameboard = [...INITIAL_GAME_BOARD].map(array => [...array]);

  for (const turn of gameTurns){
   const { square , player } = turn;
   const { row , col } = square;
   gameboard[row][col] = player;
  }
  return gameboard;
}
function derivedWinner (gameboard,players){
  let winner;
  for (const combinations of WINNING_COMBINATION){

    const firstSquareSymbol = gameboard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameboard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameboard[combinations[2].row][combinations[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }

  }
  return winner;
}
function App() {
  const [gameTurns, setGameTurns ] = useState([]);
  const [players ,setPlayers] = useState(PLAYERS)
  const activePlayer = derivedActivePlayer(gameTurns);
 const gameboard = derivedGameBoard(gameTurns);
 const winner = derivedWinner(gameboard,players);
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex){
    
    setGameTurns(
      (prevTurn) => {
       const currentPlayer = derivedActivePlayer(prevTurn);
        const updatedTurn = [
          { square: {row: rowIndex, col: colIndex},player: currentPlayer},
          ...prevTurn,
        
        ];
        return updatedTurn;
      }
      
    )
  }
  function gameRestart(){
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayers => {
      return{ 
        ...prevPlayers,
      [symbol]:newName
      };
    });
  }
  return (
    <main>
          <div id="game-container">
      <ol id="players" className="highlight-player">
      <Player initialName={PLAYERS.X} symbol="X" isActive= { activePlayer === 'X' } onChangeName = {handlePlayerNameChange}/>
      <Player initialName={PLAYERS.O} symbol="O" isActive= { activePlayer === 'O' } onChangeName = {handlePlayerNameChange}/> 
      </ol>
      {(winner||hasDraw) && <GameOver winner ={winner} onRematch = {gameRestart}/>}
      <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} board={gameboard}/>
    </div>
    <Log turns = {gameTurns}/>
    </main>
  )
}

export default App;
