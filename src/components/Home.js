import Repository from "../repository/repository";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
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

    const filterTickets = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data);
        let filteredTickets = tickets.filter((ticket) => {
            console.log(ticket.date + " " + data.Date);
            return new Date(ticket.date).toDateString() === new Date(data.get('date')).toDateString();
        });
        setTickets(filteredTickets);

    }

    const handleExport = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data);
        Repository.exportTickets(data.get('genre')).then((result) => {
            if (result.status !== 200) {
                alert("Error while exporting tickets");
            }
            else {
                console.log(result.data);
                let file = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                let a = document.createElement('a');
                a.href = URL.createObjectURL(file);
                a.download = 'tickets.xlsx';
                a.click();
            }
        });
    }

    const handleAddToCart = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data);
        Repository.addToCart(data.get('id'), data.get('quantity')).then((result) => {
            if (result.status !== 200) {
                alert("Error while adding to cart");
            }
            else {
                alert("Added to cart");
            }
        });
    }



    useEffect(() => {
        getTickets();
        let jwt = localStorage.getItem('jwt');
        let token = jwt ? jwtDecode(jwt) : null;
        setAdmin(token != null &&  token.Role === "Admin");
        console.log(token);
        console.log(token.Role === "Admin");
    }, []);


    // console.log(tickets);
    let router = useNavigate();

    return (
        <>
            <div class="container">

                <Button variant="primary" type="button" onClick={() => { router('/add-ticket') }}>Add new ticket</Button>

                <Form method="post" class="mb-2" onSubmit={filterTickets}>
                    <Form.Group className="mb-3" controlId="formDate" >
                        <Form.Label>Filter</Form.Label>
                        <Form.Control type="date" name="date" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Filter</Button>
                </Form>
                {admin ?
                    <div>
                        <h3>Export all tickets by genre</h3>
                        <Form method="post" class="mb-2" onSubmit={handleExport}>
                            <Form.Group className="mb-3" controlId="formDate" >
                                <Form.Label>Genre</Form.Label>
                                <Form.Control type="text" name="genre" />
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
                                <p class="font-weight-bold">Price: {ticket.price}</p>
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
                                    <Form method="post" onSubmit={handleAddToCart}>
                                        <input type="hidden" name="id" value={ticket.id} />
                                        <input class="form-control" type="number" min="1" max="10" name="quantity" defaultValue="1" />
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