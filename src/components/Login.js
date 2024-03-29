import React from "react";
import Repository from "../repository/repository";
import { Form, Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

export default function Login() {
    let router = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        let json = {};
        data.forEach(function (value, key) {
            json[key] = value;
        });
        Repository.login(json).then((result) => {
            if(result.status === 200){
                alert("Login successful");
                localStorage.setItem('jwt', result.data);
                console.log(jwtDecode(localStorage.getItem('jwt')));
                console.log(result.data);
                router('/');
            }
        });
        
    }



    return (
        <Container >
            <h1>Login</h1>
            <Form onSubmit={handleSubmit} className="justify-content-start">
                <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="Email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="Password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
        </Container>
    );
}