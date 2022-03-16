import { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

function NavBar(props) {
  const [searchField, setSearchField] = useState();

  const lastPageHandler = (event) => {
    props.lastPage();
  };
  const nextPageHandler = (event) => {
    props.nextPage();
  };

  const playGameHandler = (event) => {
    props.play();
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

  const everyImageButtonHandler = (event) => {
    event.preventDefault();
    props.everyImage();
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
            <Nav.Link href="#action1">Login with google</Nav.Link>
            <Nav.Link onClick={playGameHandler} href="#action2">
              Play
            </Nav.Link>
            <NavDropdown title="More" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Highscore</NavDropdown.Item>
              <NavDropdown.Item
                onClick={everyImageButtonHandler}
                href="#action4"
              >
                View all images
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={lastPageHandler}>Last page</Nav.Link>
            <Nav.Link onClick={nextPageHandler}>Next page</Nav.Link>
          </Nav>

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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
