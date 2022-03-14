import "./FlipImage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap";

// import Image from "../Images/1.jpeg";
const FlipImage = (props) => {
  return (
    <div>
      <div className="grid-item">
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={props.image} alt={"Nope"} />
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
};

export default FlipImage;
