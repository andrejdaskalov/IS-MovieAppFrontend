import { React, useEffect, useState } from "react";
import Repository from "../repository/repository";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AddPage() {

    let [movies, setMovies] = useState([]);
    let router = useNavigate();

    useEffect(() => {
        Repository.getMovies().then((result) => {
            if (result?.status !== 200) {
                alert("Error while loading movies");
                return;
            }
            if (result?.data) {
                console.log(result.data);
                setMovies(result.data);
            }
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        let json = {};
        data.forEach(function (value, key) {
            json[key] = value;
        });
        Repository.addTicket(json).then((result) => {
            if (result.status !== 200) {
                alert("Error while adding ticket");
            }
            else {
                router('/');
            }

        });
    }

    return (
        <>
            <h1 className="h1 mx-5">Add page</h1>
            <Form method="post" className="mx-5" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="selectedMovie">
                    <Form.Label>Movie</Form.Label>
                    <Form.Select aria-label="Select movie" name="SelectedMovie">
                        {movies.map((movie) => {
                            return (
                                <option value={movie.id} >{movie.title}</option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="seat">
                    <Form.Label>Seat</Form.Label>
                    <Form.Control name="Seat" type="number" min="1" max="200" placeholder="Seat" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control name="Price" type="number" min="1" placeholder="Price" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control name="Date" type="date" placeholder="Date" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}