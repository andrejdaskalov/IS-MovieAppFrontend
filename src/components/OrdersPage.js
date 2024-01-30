import { React, useState, useEffect } from 'react';
import Repository from '../repository/repository';
import { Button, Container } from 'react-bootstrap';

function OrdersListPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        Repository.getOrders().then((result) => {
            if (result.status !== 200) {
                alert("Error while loading orders");
                return;
            }
            if (result?.data) {
                console.log(result.data);
                setOrders(result.data);
            }
        });
    }, []);

    const handleCreateInvoice = (id) => {
        Repository.createInvoice(id).then((result) => {
            if (result.status !== 200) {
                alert("Error while creating invoice");
                return;
            }
            if (result?.data) {
                console.log(result.data);
                let file = new Blob([result.data], { type: 'application/pdf' });
                let a = document.createElement('a');
                a.href = URL.createObjectURL(file);
                a.download = 'invoice.pdf';
                a.click();
            }
        });
    }



    return (
        <div>
            <h1>Orders List</h1>
            <Container>
                <table className='w-100'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Price</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.totalPrice}</td>
                                <td>
                                    <Button variant="primary" onClick={() => { handleCreateInvoice(order.id) }}>Create Invoice</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        </div>
    );
}

export default OrdersListPage;