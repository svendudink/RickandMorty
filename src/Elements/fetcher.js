import { useState } from "react";
import NavBar from "./NavBar";

import FlipImage from "./FlipImage";

let rickLink = "https://rickandmortyapi.com/api/character/";
let rickOne = {
  results: [
    {
      id: "preLoad",
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    },
  ],
};

function Fetcher(props) {
  const nextHandler = (event) => {
    console.log("test");
    rickLink = rickObj.info.next;
    fetchData();
  };

  const lastHandler = (event) => {
    rickLink = rickObj.info.prev;
    fetchData();
  };

  const searchButtonHandler = (link) => {
    console.log(link);
    rickLink = link;
    fetchData();
  };

  // Game Logic, move later to other place when figured out howto pass data to children
  let gameOn = false;

  const loadAllImagesHandler = () => {
    console.log("Gamelogic");
    gameOn = true;
    console.log(gameOn);
  };

  // End of game logic

  const [rickObj, setRickObj] = useState(rickOne);
  const fetchData = () => {
    fetch(rickLink)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRickObj(data);
      }, [])
      .then(console.log("nope"));
  };

  if (rickObj.results[0].id === "preLoad") {
    fetchData();
  }
  return (
    <div>
      <NavBar
        nextPage={nextHandler}
        lastPage={lastHandler}
        searchButton={searchButtonHandler}
        playGame={loadAllImagesHandler}
      />
      <div className="flex-Container">
        {rickObj.results.map((js, index) => {
          return (
            <FlipImage
              key={index.toString()}
              name={js.name}
              image={js.image}
              status={js.status}
              species={js.species}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Fetcher;
