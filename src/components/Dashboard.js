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
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import CustomNavbar from "./Navbar";
import questions from "../data/Questions";
import NewJournal from "./New_Journal";
import PastJournals from "./PastJournals";

export default function Dashboard() {
  return (
    <>
      <CustomNavbar />
      <Container fluid="md">
        <Row>
          {/* Main Content */}
          <Col>
            <PastJournals />
          </Col>
        </Row>
      </Container>
    </>
  );
}
