import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";
import ButtonAppBar from "./AppBar";
import Card from "react-bootstrap/Card";

export default function DataPieChart() {
  const [chartData, setChartData] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (!loggedInUser) {
      return; // Redirect to login if not logged in
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://expense-tracker-data-iddn.onrender.com/expenses/by-email/${loggedInUser.email}`);
        const formattedChartData = response.data.map((item, index) => ({
          id: index,
          value: parseFloat(item.amount),
          label: item.expenseType,
        }));
        setChartData(formattedChartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loggedInUser]);

  return (
    <div>
      <ButtonAppBar />
      <br />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <>
          {['Info'].map((variant) => (
            <Card
              bg={variant.toLowerCase()}
              key={variant}
              text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
              style={{ width: '18rem' }}
              className="mb-2"
            >
              <Card.Header>User Expense</Card.Header>
              <Card.Body>
                <Card.Title> Hey, {loggedInUser.username}</Card.Title>
                <Card.Text>
                  This is a pie chart representation of your expense.
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <PieChart
            series={[
              {
                data: chartData,
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                startAngle: -90,
                endAngle: 180,
                cx: 150,
                cy: 150,
              },
            ]}
            width={400}
            height={300}
          />
        </div>
      </div>
      <br />
    </div>
  );
}
