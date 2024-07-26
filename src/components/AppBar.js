import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    alert("Logout Successfully. See you Again!");
    navigate('/'); // Navigate to the login screen upon logout
  };

  const handleAddExpense = () => {
    navigate('/expensecard'); // Navigate to the Add Expense page
  };

  const handleDashboard = () => {
    navigate('/dashboard'); // Navigate to the Dashboard page
  };

  const handleChartVisualization = () => {
    navigate('/chartvisualization');
  }

  const handleBoxPlotVisualization = () => {
    navigate('/boxplotvisualization'); 
  }

  const handleProfile = () => {
    navigate('/profile');
  }

  const handleUsersList = () => {
    navigate('/userslist');
  }

  const handleWeatherApi = () => {
    navigate('/weatherapi');
  }

  const handleDeveloperContact = () => {
    navigate('/developercontact');
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {loggedInUser && `Welcome, ${loggedInUser.username}`}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            <ExitToAppIcon sx={{ mr: 1 }} />Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <List>
          <ListItem button onClick={handleDashboard}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={handleAddExpense}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Add Expense" />
          </ListItem>
          <ListItem button onClick={handleChartVisualization}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Chart Visualization" />
          </ListItem>
          <ListItem button onClick={handleBoxPlotVisualization}>
            <ListItemIcon>
              <ScatterPlotIcon />
            </ListItemIcon>
            <ListItemText primary="BoxPlot Visualization" />
          </ListItem>
          <ListItem button onClick={handleProfile}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={handleUsersList}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="User's list" />
          </ListItem>
          <ListItem button onClick={handleWeatherApi}>
            <ListItemIcon>
              <WbSunnyIcon />
            </ListItemIcon>
            <ListItemText primary="Weather API" />
          </ListItem>
          <ListItem button onClick={handleDeveloperContact}>
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Developer Contact" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
