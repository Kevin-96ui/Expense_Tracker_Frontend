import './App.css';
import ExpenseCard from './components/ExpenseCard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from './components/Login';
import RegisterForm from "./components/Register";
import Dashboard from './components/Dashboard';
import DataBarChart from './components/D3bar';
import DataPieChart from './components/DataChart';
import Profile from './components/Profile';
import DeveloperContact from './components/DeveloperContact';
import UsersList from './components/UsersList';
import WeatherAPI from './components/WeatherAPI';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/expensecard" element={<ExpenseCard />}/>
        <Route path="/chartvisualization" element={<DataPieChart/>}/>
        <Route path="/boxplotvisualization" element={<DataBarChart/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/UsersList" element={<UsersList/>}/>
        <Route path="/developercontact" element={<DeveloperContact/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/weatherapi" element={<WeatherAPI/>} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
