import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div style={{ backgroundColor: "black" }}>
      <Navbar>
        <Container>
          <Nav className="me-auto w-100 d-flex justify-content-between">
            <Nav.Link href="#home">Home</Nav.Link>
            <div>
              <Link to="/login m-auto">Logout</Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
