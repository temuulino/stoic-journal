import React, { useState } from "react";
import {
  Card,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import CustomNavbar from "./Navbar";
import PastJournals from "./PastJournals";
import "../styling/dashboard.css";

export default function Dashboard() {
  return (
    <>
      <CustomNavbar />
      <Container>
        <Row>
          {/* Main Content */}
          <Col className="justify-content-center mt-5">
            <PastJournals />
          </Col>
        </Row>
      </Container>
    </>
  );
}
