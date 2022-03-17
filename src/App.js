import "./App.css";

import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import Fetcher from "./Elements/Characters";

function App(props) {
  const lastPass = (score) => {
    console.log(score);
  };

  return (
    <div>
      <Fetcher lastPass={lastPass} />
    </div>
  );
}

export default App;
