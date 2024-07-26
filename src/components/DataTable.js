import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Modal, Form } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axios from 'axios';

export default function DataTable({ rows: initialRows }) {
  const [rows, setRows] = useState(initialRows);

  const [showModal, setShowModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({ _id: '', expenseType: '', amount: '', type: '', description: '', email: '' });

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const handleEdit = (row) => {
    setCurrentRow(row);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedRow = {
        _id: currentRow._id,
        expenseType: currentRow.expenseType,
        amount: currentRow.amount,
        type: currentRow.type,
        description: currentRow.description,
      };

      await axios.put(`http://localhost:5002/expense/${currentRow._id}`, updatedRow);

      setRows((prevRows) =>
        prevRows.map((row) => (row._id === currentRow._id ? { ...row, ...updatedRow } : row))
      );

      setShowModal(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`https://expense-tracker-data-iddn.onrender.com/expenses/${_id}`);
      setRows((prevRows) => prevRows.filter((row) => row._id !== _id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'expenseType', headerName: 'Expense Type', width: 150 },
    { field: 'amount', headerName: 'Amount', type: 'number', width: 120 },
    { 
      field: 'type', 
      headerName: 'Type', 
      width: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {params.value === 'Profit' ? (
            <>
              <FaArrowUp style={{ color: 'green', marginRight: 4 }} />
              <span style={{ color: 'green' }}>{params.value}</span>
            </>
          ) : params.value === 'Loss' ? (
            <>
              <FaArrowDown style={{ color: 'red', marginRight: 4 }} />
              <span style={{ color: 'red' }}>{params.value}</span>
            </>
          ) : (
            <span>{params.value}</span>
          )}
        </div>
      ),
    },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div>
          <Button variant="primary" size="sm" onClick={() => handleEdit(params.row)}>Edit</Button>
          {"  "} 
          <Button variant="danger" size="sm" onClick={() => handleDelete(params.row._id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          autoHeight
          getRowId={(row) => row._id}
        />
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formExpenseType">
              <Form.Label>Expense Type</Form.Label>
              <Form.Select
                value={currentRow.expenseType}
                onChange={(e) => setCurrentRow({ ...currentRow, expenseType: e.target.value })}
                aria-label="Expense Type"
              >
                <option value="">Select Expense Type</option>
                <option value="Home">Home</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Grocery">Grocery</option>
                <option value="Electric bill">Electric Bill</option>
                <option value="Education">Education</option>
                <option value="Loan">Loan</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snacks">Snacks</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={currentRow.amount}
                onChange={(e) => setCurrentRow({ ...currentRow, amount: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={currentRow.type}
                onChange={(e) => setCurrentRow({ ...currentRow, type: e.target.value })}
                aria-label="Profit / Loss"
              >
                <option value="">Select Type</option>
                <option value="Profit">Profit</option>
                <option value="Loss">Loss</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={currentRow.description}
                onChange={(e) => setCurrentRow({ ...currentRow, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={currentRow.email}
                onChange={(e) => setCurrentRow({ ...currentRow, email: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
