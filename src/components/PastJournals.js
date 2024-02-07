import React, { useState, useEffect } from "react";
import { database } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { ref, get } from "firebase/database";

import { Button, Col, Row, TextArea, Card, Modal } from "react-bootstrap";

const PastJournals = () => {
  const { getCurrentUserId } = useAuth();
  const [pastJournals, setPastJournals] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayAnswers, setSelectedDayAnswers] = useState([]);
  const [selectedDayQuestions, setSelectedDayQuestions] = useState([]);

  const fetchPastJournals = async () => {
    const userId = getCurrentUserId();

    if (userId) {
      const journalRef = ref(database, `journals/${userId}`);
      const userJournalsSnapshot = await get(journalRef);

      if (userJournalsSnapshot.exists()) {
        const userJournalsData = userJournalsSnapshot.val();
        setPastJournals(Object.values(userJournalsData));
      } else {
        console.log("No journals found for the user.");
      }
    }
  };

  useEffect(() => {
    fetchPastJournals();
  }, [getCurrentUserId]);

  const handleButtonClick = (index) => {
    setSelectedDay(index === selectedDay ? null : index);
    const selectedJournal = pastJournals[index];
    setSelectedDayAnswers(
      Object.keys(selectedJournal.questions).map(
        (questionKey) => selectedJournal.answers[questionKey]
      )
    );
    setSelectedDayQuestions(
      Object.keys(selectedJournal.questions).map(
        (questionKey) => selectedJournal.questions[questionKey]
      )
    );
  };

  return (
    <Row>
      <Col sm={2} className="text-center mt-4 mb-4">
        {pastJournals.map((journal, index) => (
          <Card className="mb-4">
            <Card.Body>
              <Button
                type="button"
                variant="dark"
                onClick={() => handleButtonClick(index)}
              >
                Day {index + 1}
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Col>
      <Col sm={8} className="text-center mt-4 mb-4 ml-4">
        {selectedDayQuestions.map((questions, index) => (
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              {questions}
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={selectedDayAnswers[index]}
              readOnly
            />
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default PastJournals;
