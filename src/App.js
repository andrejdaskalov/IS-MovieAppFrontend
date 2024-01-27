import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AddPage from './components/AddPage';
import EditPage from './components/EditPage';
import { useState, useEffect } from 'react';

export default function App() {
  let [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Movie Tickets</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Tickets</Nav.Link>
              <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
              <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
            </Nav>
            {!loggedIn ?
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </Nav>
              : <Nav className="ms-auto">
                <Nav.Link as={Link} to="/login" onClick={() => {
                  localStorage.removeItem('jwt');
                  setLoggedIn(false);
                }}>Logout</Nav.Link>
              </Nav>
            }
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-ticket" element={<AddPage />} />
          <Route path="/edit-ticket/:id" element={<EditPage />} />


          <Route path="/admin">
            {/* Your admin page component goes here */}
          </Route>
          <Route path="/cart">
            {/* Your cart page component goes here */}
          </Route>
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}
