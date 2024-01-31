import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AddPage from './components/AddPage';
import EditPage from './components/EditPage';
import { useState, useEffect } from 'react';
import Cart from './components/Cart';
import ThankYouPage from './components/ThankYou';
import OrdersListPage from './components/OrdersPage';
import AdminPage from './components/AdminPage';
import { jwtDecode } from "jwt-decode";

export default function App() {
  let [loggedIn, setLoggedIn] = useState(false);
  let [admin, setAdmin] = useState(false);


  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setLoggedIn(true);
    }
    let jwt = localStorage.getItem('jwt');
    let token = jwt ? jwtDecode(jwt) : null;
    setAdmin(token != null && token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === "Admin");
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Movie Tickets</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Tickets</Nav.Link>
              {
                admin ?
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                : null

              }
              <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
              <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/add-ticket" element={<ProtectedRoute><AddPage /></ProtectedRoute>} />
          <Route path="/edit-ticket/:id" element={<ProtectedRoute><EditPage /></ProtectedRoute>} />
          <Route path="/thank-you" element={<ProtectedRoute><ThankYouPage /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><OrdersListPage /></ProtectedRoute>} />

        </Routes>
      </div>
    </Router>
  );
}



function ProtectedRoute({ children, ...rest }) {
  const token = localStorage.getItem('jwt');
  return token ? children : <Navigate to="/login" />;
}

function AdminRoute({ children, ...rest }) {
  const token = localStorage.getItem('jwt');
  let isAdmin = token ? jwtDecode(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === "Admin" : false;
  return isAdmin ? children : <Navigate to="/" />;
}