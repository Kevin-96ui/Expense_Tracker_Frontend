import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import ButtonAppBar from './AppBar'; 
import { Card, Col, Row } from 'react-bootstrap';

function UsersList() {
  const [rows, setRows] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://expense-tracker-data-iddn.onrender.com/users');
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    { field: '_id', headerName: 'User Id', width: 70 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
  ];

  return (
    <div>
      <ButtonAppBar />
      <br/>
      <Row className="justify-content-center">
        <Col xs={12} md={6}> 
          <Card
            bg="dark"
            text="white"
            className="mb-2"
          >
            <Card.Header>User Profile</Card.Header>
            <Card.Body>
              <Card.Title>Hey, {loggedInUser.username}</Card.Title>
              <Card.Text>
                This is the list of users of our product.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <br/>
      <div style={{ flexGrow: 1, height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          autoHeight
          getRowId={(row) => row._id} // Specify the _id field as the unique id for each row
        />
      </div>
    </div>
  );
}

export default UsersList;
