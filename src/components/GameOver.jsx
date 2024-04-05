function GameOver({winner , onRematch}){

    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>You Won {winner}!</p>}
            {!winner && <p>Its Draw</p>}
            <p><button onClick={onRematch}> Rematch</button></p>

        </div>

    );
}

export default GameOver;