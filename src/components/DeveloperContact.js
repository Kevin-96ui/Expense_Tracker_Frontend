import React from 'react';
import { Card, Button } from 'react-bootstrap';
import ButtonAppBar from './AppBar'; 
import KevinImage from '../assets/kevinmatthewfranklin.jpg';

function DeveloperContact() {
  return (
    <div>
      <ButtonAppBar />
      <br />
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Card style={{ width: "18rem", textAlign: "center" }}>
          <Card.Img
            variant="top"
            src={KevinImage}
            style={{ width: "100%", height: "auto" }}
          />
          <Card.Body>
            <Card.Title>Kevin Matthew Franklin</Card.Title>
            <Card.Text>
              Junior Software Developer <br />
              CEO of KMF
            </Card.Text>
            <Button variant="primary" href="mailto:kevinmathew365@gmail.com">
              Contact
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default DeveloperContact;
