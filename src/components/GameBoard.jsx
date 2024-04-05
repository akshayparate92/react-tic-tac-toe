import { useState } from "react";

let initialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null]
 ];
function GameBoard({onSelectSquare , activePlayerSymbol }){
   const [gameboard,setGameBoard] = useState(initialGameBoard);
    function handleGameBoardClick(rowIndex,colIndex){
       setGameBoard(
        (prevGameBoard => {
            const updatedBoard = prevGameBoard.map((innerArray) => [...innerArray]);
            updatedBoard[rowIndex][colIndex] =activePlayerSymbol;
            return updatedBoard;
        }

        )
       )
       onSelectSquare();
    }
   
    return (
        <ol id="game-board">
            {gameboard.map((row,rowIndex)=> 
            (<li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol,colIndex) => (<li key={colIndex}><button onClick={() => handleGameBoardClick(rowIndex,colIndex)}>{playerSymbol}</button></li>)
                    )}
                </ol>
            </li>))}
        </ol>
    );
}

export default GameBoard;