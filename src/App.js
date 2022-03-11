import "./App.css";
import FlipImage from "./Elements/FlipImage";

import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import { useState } from "react";

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>;
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

let rickLink = "https://rickandmortyapi.com/api/character/";

function App() {
  const nextHandler = (event) => {
    event.preventDefault();
    rickLink = rickObj.info.next;
  };

  const lastHandler = (event) => {
    event.preventDefault();
  };

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
      <button onClick={lastHandler}>last page</button>
      <button onClick={nextHandler}>next page</button>
    </div>
  );
}

export default App;
