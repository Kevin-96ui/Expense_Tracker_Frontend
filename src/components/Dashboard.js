import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonAppBar from './AppBar';
import DataTable from './DataTable';
import UserCard from './UserCard';

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    const fetchData = async () => {
      if (!loggedInUser) {
        return; // Redirect to login if not logged in
      }
      try {
        const response = await axios.get(`http://localhost:5002/expense/by-email/${loggedInUser.email}`);
        setRows(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [loggedInUser]);

  return (
    <div>
      <ButtonAppBar />
      <br />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <UserCard expenses={rows} user={loggedInUser} />
        <br />
        <DataTable rows={rows} />
        <br />
      </div>
    </div>
  );
};

export default Dashboard;
