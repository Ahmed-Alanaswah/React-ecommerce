import { NavLink } from "react-router-dom";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import styles from "./styles.module.css";
import HeaderLeftBar from "./HeaderLeftBar/HeaderLeftBar";

const { headerContainer, headerLogo } = styles;

const Header = () => {
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our</span> <Badge>Ecom</Badge>
        </h1>

        <HeaderLeftBar />
      </div>

      <div>
        <Navbar
          bg="dark"
          data-bs-theme="dark"
          expand="lg"
          className="bg-body-tertiary"
        >
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="category">
                  Categories
                </Nav.Link>

                <Nav.Link as={NavLink} to="about-us">
                  About
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={NavLink} to="login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="register">
                  Register
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
