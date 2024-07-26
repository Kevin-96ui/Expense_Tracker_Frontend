import React from "react";
import { Card, Row, Col } from "react-bootstrap";

function UserCard({ expenses, user }) {
  // Debug: Log the expenses to check the data
  // console.log("Expenses:", expenses);

  // Calculate total profit and total loss
  const totalProfit = expenses.reduce((acc, expense) => {
    const amount = Number(expense.amount);
    if (expense.type === "Profit") {
      acc += amount;
    }
    return acc;
  }, 0);

  const totalLoss = expenses.reduce((acc, expense) => {
    const amount = Number(expense.amount);
    if (expense.type === "Loss") {
      acc += amount;
    }
    return acc;
  }, 0);

  // Debug: Log the calculated totals
  // console.log(`Total Profit: ${totalProfit}, Total Loss: ${totalLoss}`);

  return (
    <div>
      <Row>
        <Card bg="dark" text="white" className="mb-2">
          <Card.Header>User Profile</Card.Header>
          <Card.Body>
            <Card.Title>Hey, {user.username}</Card.Title>
            <Card.Text>
              This is your "{user.email}" email and <br /> your password
              is "{user.password}".
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>

      <Row>
        <Col>
          <Card bg="success" text="white" className="mb-2">
            <Card.Header>Total Profit</Card.Header>
            <Card.Body>
              <Card.Title>${totalProfit}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card bg="danger" text="white" className="mb-2">
            <Card.Header>Total Loss</Card.Header>
            <Card.Body>
              <Card.Title>${totalLoss}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default UserCard;
