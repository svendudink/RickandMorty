import "./GameLogic.css";
import { useEffect, useState } from "react";

function GameLogic(props) {
  const [messageWindow, setMessageWindow] = useState();
  const [playerState, setPlayerState] = useState(undefined);

  useEffect(() => {
    if (props.clickedID === undefined) {
      setMessageWindow(props.findName);
    } else if (props.winnerID.toString() === props.clickedID) {
      setMessageWindow("you won");
      setPlayerState(true);
    } else {
      setMessageWindow("You lost");
      setPlayerState(false);
    }
  }, [props.findName, props.clickedID]);

  // Passing the data upstream
  const gameStats = {
    playerWon: playerState,
    score: 0,
  };

  props.passUpstream(gameStats);

  if (props.clickedID === undefined)
    console.log(props.findName, props.winnerID, props.clickedID);

  useEffect(() => {}, []);
  //props.winnerID === props.clickedID ? !
  return (
    <div>
      <div className="Welcome">{messageWindow} </div>
    </div>
  );
}

export default GameLogic;
