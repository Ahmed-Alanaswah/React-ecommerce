import { HeaderBasket } from "@components/ecommerce";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import styles from "./styles.module.css";
const { headerContainer, headerLogo } = styles;
const Header = () => {
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our</span> <Badge>Ecom</Badge>
        </h1>
        <HeaderBasket />
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
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Categpries</Nav.Link>
                <Nav.Link href="#link">About</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="#home">Login</Nav.Link>
                <Nav.Link href="#link">Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;
