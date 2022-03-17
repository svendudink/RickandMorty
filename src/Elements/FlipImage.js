import "./FlipImage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";

// import Image from "../Images/1.jpeg";
const FlipImage = (props) => {
  // const obj = {
  //   name: "sven",
  //   age: 33,
  // };

  // let { name } = obj;
  // console.log(name);

  // let { age } = obj;
  // console.log("age", age);

  if (props.flipLock === false) {
    return (
      <div>
        <div className="singleImage">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={props.image} alt={"Failed to load"} />
              </div>
              <div className="flip-card-back">
                <h1>Name: {props.name}</h1>
                <p>status: {props.status}</p>
                <p>Species:{props.species}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="singleImage">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={props.image} alt={"Failed to load"} />
              </div>
              <div
                id={props.index}
                onClick={props.winnerClick}
                className="flip-card-back"
              >
                <h1>Secret</h1>
                <p>status: {props.status}</p>
                <p>Species:{props.species}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default FlipImage;
