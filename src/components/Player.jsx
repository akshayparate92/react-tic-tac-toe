import {useState} from 'react';

function Player ({initialName,symbol, isActive}){
    const [isEditing, setIsEditing] = useState(false);
    const [playerName , setPlayerName] = useState(initialName);
    function handleClickEdit(){
        setIsEditing(editing => !editing);
    }
    function handleChange(event){
        setPlayerName(event.target.value);
    }
    let playerUpdatedName =  <span className="player-name">{playerName}</span>;
    let btnCaption = "Edit";
    if(isEditing){
        playerUpdatedName = <input type='text' required value={playerName} onChange={handleChange} />;
        btnCaption = "Save";
    }
     
    return(

        <li className={isActive ? 'active' : undefined}>
        <span className="palyer">
        {playerUpdatedName}
        <span className="player-symbol ">{symbol}</span>
        </span>
       
        <button onClick={handleClickEdit}>{btnCaption   }</button>
      </li>
    )
}

export default Player;