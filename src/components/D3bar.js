import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Card from "react-bootstrap/Card";
import ButtonAppBar from "./AppBar";
import { Container, Row, Col } from "react-bootstrap";

export default function DataBarChart() {
  const [data, setData] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (!loggedInUser) {
      return; // Redirect to login if not logged in
    }
    fetch(`https://expense-tracker-data-iddn.onrender.com/expenses/by-email/${loggedInUser.email}`)
      .then((response) => response.json())
      .then((data) => {
        const parsedData = data.map((d) => ({
          expenseType: d.expenseType,
          amount: Number(d.amount),
        }));
        setData(parsedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [loggedInUser]);

  return (
    <div>
      <ButtonAppBar />
      <Container fluid style={{ padding: "20px" }}>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card bg="info" text="white" className="mb-2">
              <Card.Header>User Expense</Card.Header>
              <Card.Body>
                <Card.Title> Hey, {loggedInUser.username}</Card.Title>
                <Card.Text>
                  This is a Bar chart representation of your expense.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12}>
            <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="expenseType" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
