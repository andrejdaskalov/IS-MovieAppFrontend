import Repository from "../repository/repository";
import React from "react";
import { Button, Container, Form, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function Home() {

    let [tickets, setTickets] = useState([]);
    let [admin, setAdmin] = useState(false);

    const getTickets = () => {
        Repository.getTickets().then((result) => {
            if (result.status !== 200) {
                alert("Error while loading tickets");
                return;
            }
            if (result?.data) {
                console.log(result.data);
                setTickets(result.data);
            }
        });
    }

    const deleteTicket = (id) => {
        Repository.deleteTicket(id).then((result) => {
            if (result.status !== 200) {
                alert("Error while deleting ticket");
            }
            else {
                getTickets();
            }
        });
    }



    useEffect(() => {
        getTickets();
        let jwt = localStorage.getItem('jwt');
        let token = jwtDecode(jwt);
        setAdmin(token && token.Role && token.Role === "Admin");
        console.log(token);
        console.log(token.Role === "Admin");
    }, []);


    // console.log(tickets);
    let router = useNavigate();

    return (
        <>
            <div class="container">

                <Button variant="primary" type="button" onClick={() => { router('/add-ticket') }}>Add new ticket</Button>

                <Form method="get" class="mb-2">
                    <Form.Group className="mb-3" controlId="formDate" >
                        <Form.Label>Filter</Form.Label>
                        <Form.Control type="date" name="Date" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Filter</Button>
                </Form>
                {admin ?
                    <div>
                        <h3>Export all tickets by genre</h3>
                        <Form method="get" class="mb-2">
                            <Form.Group className="mb-3" controlId="formDate" >
                                <Form.Label>Genre</Form.Label>
                                <Form.Control type="text" name="Genre" />
                            </Form.Group>
                            <Button variant="primary" type="submit">Export all tickets</Button>
                        </Form>
                    </div> : null
                }

                {tickets.map((ticket) => {
                    return (
                        <div class="card mb-3" key={ticket.id}>
                            <div class="card-header">
                                <h3>{ticket.movieTitle}</h3>
                            </div>
                            <div class="card-body">
                                <p class="font-weight-bold">Price: {ticket.Price}</p>
                                <p>Date: {new Date(ticket.date).toDateString()}</p>
                                <p>Seat #: {ticket.seat}</p>
                            </div>
                            <div class="card-footer d-flex justify-content-between align-items-start">
                                <div>
                                    <Button variant="outline-primary" className="me-2"
                                        onClick={() => { router('/edit-ticket/' + ticket.id) }}>Edit</Button>
                                    <Button variant="danger" onClick={() => {
                                        deleteTicket(ticket.id);
                                    }}>Delete</Button>
                                </div>
                                <div>
                                    <Form method="post" action="/api/cart/add">
                                        <input type="hidden" name="id" value={ticket.Id} />
                                        <input class="form-control" type="number" min="1" max="10" name="quantity" value="1" />
                                        <Button variant="success" type="submit">Add to Cart</Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    )

                }
                )}


            </div>
        </>
    );
}