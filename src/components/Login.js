import React from "react";
import Repository from "../repository/repository";
import { Form, Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        let json = {};
        data.forEach(function (value, key) {
            json[key] = value;
        });
        Repository.login(json).then((data) => {
            localStorage.setItem('jwt', data);
            console.log(data);
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
                    Submit
                </Button>
            </Form>
        </Container>
    );
}