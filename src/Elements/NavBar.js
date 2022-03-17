import { useState } from "react";
import Google from "./Google";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

function NavBar(props) {
  const [searchField, setSearchField] = useState();

  let nonGameElements;
  if (props.flipLock === true) {
    nonGameElements = false;
  } else {
    nonGameElements = true;
  }

  const lastPageHandler = (event) => {
    props.lastPage();
  };
  const nextPageHandler = (event) => {
    props.nextPage();
  };

  const playGameHandler = (event) => {
    props.play();
  };

  const finishGameHandler = () => {
    props.finish();
  };

  const searchFieldHandler = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setSearchField(event.target.value);
  };
  const searchButtonHandler = (event) => {
    event.preventDefault();
    const searchURL = `https://rickandmortyapi.com/api/character/?name=${searchField}`;
    props.searchButton(searchURL);
  };

  const onUserData = (data) => {
    props.onUserData(data);
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#">Rick and morty the game</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Google onUserData={onUserData} />
            {nonGameElements && (
              <Nav.Link onClick={playGameHandler} href="#action2">
                Play Game
              </Nav.Link>
            )}
            {props.flipLock && (
              <Nav.Link onClick={finishGameHandler} href="#action2">
                Finish Game
              </Nav.Link>
            )}
            {/* <NavDropdown title="More" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={props.highScoreButton} href="#action3">
                Highscore
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={everyImageButtonHandler}
                href="#action4"
              >
                View all images
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Play on Hard</NavDropdown.Item>
            </NavDropdown> */}
            {nonGameElements && (
              <Nav.Link onClick={lastPageHandler}>Last page</Nav.Link>
            )}
            {nonGameElements && (
              <Nav.Link onClick={nextPageHandler}>Next page</Nav.Link>
            )}
          </Nav>
          {props.flipLock && <h1>Your Score:{props.gameScore}</h1>}

          {nonGameElements && (
            <Form className="d-flex">
              <FormControl
                onChange={searchFieldHandler}
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button onClick={searchButtonHandler} variant="outline-success">
                Search
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
