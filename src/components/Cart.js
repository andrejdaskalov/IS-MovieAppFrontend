import { React, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Repository from "../repository/repository";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadStripe } from '@stripe/stripe-js';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout,
    Elements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51NAbKcKkVIc94TENpt8aUbX2uEJKDAM2EFisRGp0zoiDDTqUJZS7YqRoZf3xqI9Si3xjSem3wtuob6x6k4Fuq1FI00zdBUFvFK');

export default function Cart() {
    let [cart, setCart] = useState([]);

    const [clientSecret, setClientSecret] = useState('');



    const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
    };

    useEffect(() => {
        getCart();
        Repository.payment(cart.id)
            .then((data) => {
                if (data?.status !== 200) {
                    console.error("Error while loading client secret");
                    return;
                }
                setClientSecret(data?.data?.clientSecret);
                console.log(`clientSecret: ${clientSecret}`);
                console.log(data);
            });
    }, []);

    const getCart = () => {
        Repository.getCart().then((result) => {
            if (result?.status !== 200) {
                alert("Error while loading cart");
                return;
            }
            if (result?.data) {
                setCart(result.data);
                console.log(result.data);
            }
        });


    };

    const handleDelete = (id) => {
        Repository.removeFromCart(id).then((result) => {
            if (result?.status !== 200) {
                alert("Error while deleting item");
                return;
            }
            getCart();
        });
    };

    const handleAmountChange = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        Repository.updateAmount(data.get("id"), data.get("amount")).then((result) => {
            if (result?.status !== 200) {
                alert("Error while updating amount");
                return;
            }
            getCart();
        });
    };

    return (
        <>
            <Container>
                <h1 className="h1">Your cart</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Movie</th>
                            <th scope="col">Price</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Total</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart?.orderItems?.map((item) => {
                            return (
                                <tr>
                                    <td>{item.movieTitle}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{parseFloat(item.price) * parseFloat(item.quantity)}</td>
                                    <td className="d-flex flex-row">
                                        <Form onSubmit={handleAmountChange} className="mx-2">
                                            {/* hidden field for id */}
                                            <input type="hidden" name="id" value={item.id} />
                                            <Form.Group className="my-1">
                                                <Form.Control type="number" name="amount" placeholder="Enter amount" />
                                            </Form.Group>
                                            <Button variant="primary" type="submit">Update amount</Button>
                                        </Form>
                                        <Button variant="danger" onClick={() => { handleDelete(item.id) }}
                                            className="mx-2"
                                        >Remove</Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <h2>Total: {cart.totalPrice}</h2>

                {clientSecret && (
                    <EmbeddedCheckoutProvider
                        stripe={stripePromise}
                        options={{ clientSecret }}
                    >
                        <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                )}



            </Container >
        </>
    );
}
