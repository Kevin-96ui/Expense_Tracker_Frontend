import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonAppBar from "./AppBar";
import AddExpenseTypeModal from "./AddExpenseTypeModal"; // Import the new component

function ExpenseCard() {
  const [formData, setFormData] = useState({
    type: "",
    expenseType: "",
    amount: "",
    description: "",
    email: "",
  });
  const [expenseTypes, setExpenseTypes] = useState([
    "Home", "Car", "Bike", "Grocery", "Electric bill", "Education", "Loan", "Breakfast", "Lunch", "Dinner", "Snacks"
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://expense-tracker-data-iddn.onrender.com/expenses", formData);
      if (response.status === 201) {
        toast.success("Expense added successfully");
        setFormData({
          type: "",
          expenseType: "",
          amount: "",
          description: "",
          email: "",
        });
      } else {
        toast.error("Failed to add expense");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast.error("Error adding expense");
    }
  };

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const addExpenseType = (newType) => {
    setExpenseTypes([...expenseTypes, newType]);
    toast.success("Expense type added successfully");
  };

  return (
    <div>
      <ButtonAppBar />
      <br />
      <Container>
        <Row className="justify-content-center mb-4">
          <Col md={8}>
            <Card bg="dark" text="white" className="mb-2">
              <Card.Header>Logged In User Details</Card.Header>
              <Card.Body>
                <Card.Title>Hey, {loggedInUser.username}</Card.Title>
                <Card.Text>
                  This is your "{loggedInUser.email}" email and <br /> your password
                  is "{loggedInUser.password}".
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="text-center">
              <Card.Header>Set your expense to get tracked</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      aria-label="Profit / Loss"
                    >
                      <option value="">Select Type</option>
                      <option value="Profit">Profit</option>
                      <option value="Loss">Loss</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Select
                      name="expenseType"
                      value={formData.expenseType}
                      onChange={handleInputChange}
                      aria-label="Expense Type"
                    >
                      <option value="">Select Expense Type</option>
                      {expenseTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </Form.Select>
                    <Button variant="link" onClick={() => setShowModal(true)}>Add New Expense Type</Button>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      name="amount"
                      type="number"
                      value={formData.amount}
                      onChange={handleInputChange}
                      placeholder="Expense Amount"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Expense Description"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Control
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Registered Email"
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">Add Expense</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
      <AddExpenseTypeModal show={showModal} handleClose={() => setShowModal(false)} addExpenseType={addExpenseType} />
    </div>
  );
}

export default ExpenseCard;
