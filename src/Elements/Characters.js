import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import GameLogic from "./GameLogic";
import FlipImage from "./FlipImage";
import HighScore from "./HighScore";

// let rickLink = "https://rickandmortyapi.com/api/character/";
// let rickOne = {
//   results: [
//     {
//       id: "preLoad",
//       name: "Rick Sanchez",
//       status: "Alive",
//       species: "Human",
//       image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
//     },
//     {
//       id: "preLoad2",
//       name: "Rick Sanchez",
//       status: "Alive",
//       species: "Human",
//       image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
//     },
//   ],
// };

function Fetcher(props) {
  //will just build all in one untill i understand howto splitup modules

  const [flipLock, setFlipLock] = useState(false);
  const [findName, setFindName] = useState("no Game Mode Pre-Alpha V0.01");

  const [randomChar, setRandomChar] = useState("blub");

  const playGameHandler = () => {
    setFlipLock(true);

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    let randomArr = [];
    for (let i = 0; i < 15; i++) {
      randomArr.push(getRandomInt(825));
    }

    setRandomChar(randomArr.indexOf(randomArr[getRandomInt(randomArr.length)]));

    setRickLink(
      `https://rickandmortyapi.com/api/character/${randomArr.toString()}`
    );
  };

  //end of gamelogic

  const nextHandler = (event) => {
    setRickLink(rickObj.info.next);
    // fetchData();
  };

  const lastHandler = (event) => {
    setRickLink(rickObj.info.prev);
    // fetchData();
  };

  const searchButtonHandler = (link) => {
    setRickLink(link);
    // fetchData();
  };

  // Game Logic, move later to other place when figured out howto pass data to children
  let gameOn = false;

  const loadAllImagesHandler = () => {
    gameOn = true;

    fetchData();
  };

  // End of game logic

  const [rickObj, setRickObj] = useState(null);

  const [rickLink, setRickLink] = useState(
    "https://rickandmortyapi.com/api/character/"
  );

  const finishGameHandler = (event) => {
    setFlipLock(false);
    gameOn = false;
    setRickLink("https://rickandmortyapi.com/api/character/");
    setWinnerScore(0);
  };

  const fetchData = () => {
    fetch(rickLink)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.results === undefined) {
          let directArr = { results: [] };
          directArr.results = [...data];

          setRickObj(directArr);

          setFindName(`${directArr.results[randomChar].name}`);
        } else if (gameOn === false) {
          setRickObj(data);
        }
        // else {
        //   gameArr.results = [...data.results, ...gameArr.results];
        //   setRickLink(data.info.next);
        //   data.info.next == null ? setRickObj(gameArr) : fetchData();
        //   console.log(gameArr);
        // }
      }, [])
      .then();
  };
  // if (flipLock === true) {
  //   console.log(rickObj.results[randomChar]);
  // }

  const [winnerClick, setWinnerClick] = useState();
  const [winnerScore, setWinnerScore] = useState(0);

  let childArr;
  const passUpstream = (childData) => {
    childArr = [childData];
    if (flipLock === false) {
      childArr[0].gamemode = false;
    } else if (childArr[0].playerWon === true) {
      playGameHandler();
      setWinnerClick(undefined);
      childArr[0].playerWon = false;

      setWinnerScore(childArr[0].score);
    } else {
      playGameHandler();
      setWinnerClick(undefined);
      childArr[0].playerWon = false;
      setWinnerScore(0);
    }
  };

  props.lastPass(winnerScore);

  useEffect(() => {
    // if (rickObj.results[0].id === "preLoad") {
    fetchData();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rickLink]);

  const [selectPageHandler, setSelectPageHandler] = useState("main");

  const highScoreButton = () => {
    setSelectPageHandler("highScore");
  };

  const [buildUserData, setBuildUserData] = useState();
  let userData;
  const onUserData = (data) => {
    userData = data;
  };
  useEffect(() => {
    setBuildUserData(userData);
  }, [userData]);

  console.log(buildUserData);

  return (
    <div>
      <NavBar
        nextPage={nextHandler}
        lastPage={lastHandler}
        searchButton={searchButtonHandler}
        everyImage={loadAllImagesHandler}
        play={playGameHandler}
        gameScore={winnerScore}
        flipLock={flipLock}
        finish={finishGameHandler}
        highScoreButton={highScoreButton}
        onUserData={onUserData}
      />

      <div className="flex-Container">
        {selectPageHandler === "main" && (
          <GameLogic
            findName={findName}
            clickedID={
              winnerClick !== undefined ? winnerClick.target.id : undefined
            }
            winnerID={randomChar}
            passUpstream={passUpstream}
            flipLock={flipLock}
          />
        )}
        {selectPageHandler === "highScore" && (
          <HighScore winnerScore={winnerScore} userData={buildUserData} />
        )}
        {selectPageHandler === "main" && rickObj ? (
          rickObj.results.map((js, index) => {
            return (
              <FlipImage
                winnerClick={setWinnerClick}
                flipLock={flipLock}
                key={index.toString()}
                name={js.name}
                image={js.image}
                status={js.status}
                species={js.species}
                index={index}
              />
            );
          })
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default Fetcher;
