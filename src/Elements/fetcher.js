import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import GameLogic from "./GameLogic";
import FlipImage from "./FlipImage";

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
    for (let i = 0; i < 20; i++) {
      randomArr.push(getRandomInt(825));
    }
    console.log(randomArr);
    console.log(shuffle(randomArr));
    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;
      // eslint-disable-next-line eqeqeq
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }

    setRandomChar(randomArr.indexOf(randomArr[getRandomInt(randomArr.length)]));

    console.log("randomArr", randomArr);
    setRickLink(
      `https://rickandmortyapi.com/api/character/${randomArr.toString()}`
    );
  };
  // console.log(randomChar);
  //end of gamelogic

  const nextHandler = (event) => {
    console.log(rickObj.info.next);
    setRickLink(rickObj.info.next);
    // fetchData();
  };

  const lastHandler = (event) => {
    setRickLink(rickObj.info.prev);
    // fetchData();
  };

  const searchButtonHandler = (link) => {
    console.log(link);
    setRickLink(link);
    // fetchData();
  };

  // Game Logic, move later to other place when figured out howto pass data to children
  let gameOn = false;
  let gameArr = [];

  const loadAllImagesHandler = () => {
    console.log("Gamelogic");
    gameOn = true;
    console.log(gameOn);
    fetchData();
  };

  // End of game logic

  const [rickObj, setRickObj] = useState(null);

  const [rickLink, setRickLink] = useState(
    "https://rickandmortyapi.com/api/character/"
  );
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
          console.log(data);
          console.log(directArr);
          setFindName(`${directArr.results[randomChar].name}`);
        } else if (gameOn === false) {
          console.log(data);

          setRickObj(data);
        }
        // else {
        //   gameArr.results = [...data.results, ...gameArr.results];
        //   setRickLink(data.info.next);
        //   data.info.next == null ? setRickObj(gameArr) : fetchData();
        //   console.log(gameArr);
        // }
      }, [])
      .then(console.log("nope"));
  };
  // if (flipLock === true) {
  //   console.log(rickObj.results[randomChar]);
  // }

  const [winnerClick, setWinnerClick] = useState();

  const passUpstream = (childData) => {
    const childArr = [childData];
    console.log(childArr);
  };

  if (winnerClick !== undefined) console.log(winnerClick.target.id);

  useEffect(() => {
    console.log("triggered");
    // if (rickObj.results[0].id === "preLoad") {
    fetchData();
    // }
  }, [rickLink]);

  return (
    <div>
      <NavBar
        nextPage={nextHandler}
        lastPage={lastHandler}
        searchButton={searchButtonHandler}
        everyImage={loadAllImagesHandler}
        play={playGameHandler}
      />

      <div className="flex-Container">
        <GameLogic
          findName={findName}
          clickedID={
            winnerClick !== undefined ? winnerClick.target.id : undefined
          }
          winnerID={randomChar}
          passUpstream={passUpstream}
        />
        {rickObj ? (
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
          <p>loading</p>
        )}
      </div>
    </div>
  );
}

export default Fetcher;
