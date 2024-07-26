import React, { useState, useEffect } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import ButtonAppBar from "./AppBar";

const Profile = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [userData, setUserData] = useState({
    id: loggedInUser?.id || "",
    username: loggedInUser?.username || "",
    email: loggedInUser?.email || "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    if (!loggedInUser || !loggedInUser.id) {
      console.error("Logged in user data is missing or invalid");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://expense-tracker-data-iddn.onrender.com/users/${loggedInUser.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData({
          id: data.id,
          username: data.username,
          email: data.email,
          newPassword: "",
          confirmNewPassword: "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [loggedInUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.newPassword === userData.confirmNewPassword) {
      try {
        const updatedUserData = {
          username: userData.username,
          email: userData.email,
          password: userData.newPassword  // Include the new password
        };

        console.log("Sending updated user data:", updatedUserData);

        const response = await fetch(`https://expense-tracker-data-iddn.onrender.com/users/${userData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedUserData)
        });

        console.log("Response status:", response.status);

        if (response.ok) {
          console.log("Profile updated successfully");
          toast.success("Password Updated Successfully!");
          alert("Password Updated Successfully");
        } else {
          console.error("Failed to update profile");
          alert("Profile Update Failed");
          toast.error("Profile Update Failed");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Profile Update Failed");
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <div>
      <ButtonAppBar/>
      <br/>
      <Container className="profile-container">
        <ToastContainer/>
        <Card className="profile-card border-0 shadow p-5">
          <Card.Body>
            <Card.Title>User Profile</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={userData.username}
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={userData.email}
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="formNewPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={userData.newPassword}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formConfirmNewPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmNewPassword"
                  value={userData.confirmNewPassword}
                  onChange={handleChange}
                />
              </Form.Group>
              {!passwordsMatch && (
                <div className="text-danger">Passwords do not match</div>
              )}
              <br />
              <Button variant="primary" type="submit" className="ml-2">
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Profile;
