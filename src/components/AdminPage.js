import React, { useState, useEffect } from 'react';
import Repository from '../repository/repository';
import { Button, Container, Form } from 'react-bootstrap';

const UserTable = () => {
    let [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            Repository.getUsers().then((result) => {
                if (result?.status !== 200) {
                    console.error("Error while fetching users");
                    return;
                }
                setUsers(result.data);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const makeAdmin = async (id) => {
        try {
            Repository.makeAdmin(id).then((result) => {
                if (result?.status !== 200) {
                    console.error("Error while making admin");
                    return;
                }
                fetchUsers();
            });
        } catch (error) {
            console.error('Error making user admin:', error);
        }
    };

    const removeAdmin = async (id) => {
        try {
            Repository.removeAdmin(id).then((result) => {
                if (result?.status !== 200) {
                    console.error("Error while removing admin "+result);
                    return;
                }
                console.log(result);
                fetchUsers();
            });
        } catch (error) {
            console.error('Error removing user admin:', error);
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', e.target.fileUpload.files[0]);
        try {
            Repository.uploadFile(formData).then((result) => {
                if (result?.status !== 200) {
                    console.error("Error while uploading file");
                    return;
                }
                fetchUsers();
            });
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <>
            <Container>
                <table className='w-100'>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user.username}>
                                <td>{user.username}</td>
                                <td>{user.role}</td>
                                <td>
                                    {user.role === 'Admin' ? (
                                        <Button onClick={() => removeAdmin(user.username)}>
                                            Remove admin
                                        </Button>
                                    ) : (
                                        <Button onClick={() => makeAdmin(user.username)}>
                                            Make admin
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>

            <Form onSubmit={handleFileUpload}>
                <Form.Group controlId="fileUpload">
                    <Form.Label>Upload File</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Button type="submit">Upload</Button>
            </Form>
        </>
    );
};

export default UserTable;