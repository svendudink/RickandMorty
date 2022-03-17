import "./GameLogic.css";
import { useEffect, useState } from "react";

function GameLogic(props) {
  const [messageWindow, setMessageWindow] = useState();
  const [playerState, setPlayerState] = useState(true);
  const [playerScore, setPlayerScore] = useState(0);

  const gameStats = {
    playerWon: playerState,
    score: playerScore,
    gamemode: false,
  };

  useEffect(() => {
    if (props.flipLock === false) {
      gameStats.gamemode = false;
      setMessageWindow("");
    } else if (props.clickedID === undefined) {
      setMessageWindow(props.findName);
    } else if (props.winnerID.toString() === props.clickedID) {
      setMessageWindow("you won");
      setPlayerState(true);
      setPlayerScore(playerScore + 1);
    } else {
      setMessageWindow("You lost the game");
      setTimeout(() => {
        setPlayerState(false);
        setPlayerScore(0);
      }, 2000);

      //props.passUpstream(gameStats);
    }
  }, [props.findName, props.clickedID, props.flipLock]);

  useEffect(() => {
    props.passUpstream(gameStats);
  }, [playerScore]);

  // Passing the data upstream

  //props.winnerID === props.clickedID ? !
  return (
    <div>
      <div className="Welcome">{messageWindow} </div>
    </div>
  );
}

export default GameLogic;
