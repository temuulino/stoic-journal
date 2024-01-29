import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import questions from "../data/Questions";
import { Button, Navbar, Container, Nav, Modal } from "react-bootstrap";
import NewJournal from "./New_Journal";
import "../assets/icons/logo.svg";

export default function CustomNavbar() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const history = useHistory();
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Stoic Journal</Navbar.Brand>

        <Nav className="ms-auto">
          <Button variant="outline-success" onClick={openDialog}>
            New Journal
          </Button>
          <Modal show={isDialogOpen} onHide={closeDialog}>
            <Modal.Header closeButton>
              <Modal.Title>New Journal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <NewJournal questions={questions} />
            </Modal.Body>
          </Modal>
        </Nav>
        <Nav className="ms-auto">
          <Button variant="primary" onClick={handleLogout}>
            Log Out
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}
