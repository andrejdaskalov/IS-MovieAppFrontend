import React from "react";
import Repository from "../repository/repository";
import { Form, Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    let router = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        let json = {};
        data.forEach(function (value, key) {
            json[key] = value;
        });
        if(json.Password !== json.ConfirmPassword){
            alert("Passwords do not match");
            return;
        }
        Repository.register(json).then((result) => {
            if(result.status === 200){
                alert("Registration successful");
                localStorage.setItem('jwt', data);
                router('/');
            }
            console.log(data);
        });
        
    }

    return (
        <Container >
            <h1>Register</h1>
            <Form onSubmit={handleSubmit} className="justify-content-start">
                <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="Email" placeholder="example@somedomain.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="Password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name="ConfirmPassword" placeholder="Confirm Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    );
}