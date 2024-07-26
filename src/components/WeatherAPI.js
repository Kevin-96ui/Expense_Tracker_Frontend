import React, { useState } from 'react';
import { Card, Button, Form, FormControl, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ButtonAppBar from './AppBar'; 

function WeatherAPI() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);

  const apiKey = '6ce3bd7775974596bcf64024242106';

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <ButtonAppBar />
      <br />
      <br />
      <Container>
        <p>Search a place to know about the current weather</p>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Form inline="true" onSubmit={handleSearch} className="mb-4">
              <FormControl 
                type="text" 
                placeholder="Enter location" 
                className="mr-sm-2" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <br/>
              <Button type="submit" variant="primary">Search</Button>
            </Form>
          </Col>
        </Row>
        {weather && (
          <Row className="justify-content-center mt-4">
            <Card style={{ width: "18rem", textAlign: "center" }}>
              <Card.Body>
                <Card.Title>Weather in {weather.location.name}</Card.Title>
                <Card.Text>
                  Temperature: {weather.current.temp_c}°C <br />
                  Condition: {weather.current.condition.text}
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default WeatherAPI;
