import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

function AddExpenseTypeModal({ show, handleClose, addExpenseType }) {
  const [newExpenseType, setNewExpenseType] = useState('');

  const handleAdd = () => {
    if (newExpenseType.trim() === '') {
      toast.error("Expense type cannot be empty");
      return;
    }
    addExpenseType(newExpenseType);
    setNewExpenseType('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Expense Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNewExpenseType">
            <Form.Label>Expense Type</Form.Label>
            <Form.Control
              type="text"
              value={newExpenseType}
              onChange={(e) => setNewExpenseType(e.target.value)}
              placeholder="Enter new expense type"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleAdd}>Add Expense Type</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddExpenseTypeModal;
