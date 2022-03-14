import "./App.css";

import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";
import Fetcher from "./Elements/Fetcher";

function App(props) {
  console.log(props.lastPageHandler);
  return (
    <div>
      <Fetcher />
    </div>
  );
}

export default App;
