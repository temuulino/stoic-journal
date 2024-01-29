import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { database } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { ref, push } from "firebase/database";

const NewJournal = ({ questions }) => {
  const { getCurrentUserId } = useAuth();
  const [journalData, setJournalData] = useState({
    id: 0,
    title: "",
    content: "",
    questions: [],
    answers: Array.from({ length: 3 }, () => ""),
  });

  useEffect(() => {
    if (questions && questions.length >= 3) {
      setJournalData((prevData) => ({
        ...prevData,
        questions: getRandomQuestions(),
      }));
    }
  }, [questions]);

  const getRandomQuestions = () => {
    const randomPrompts = Array.from({ length: 3 }, () =>
      Math.floor(Math.random() * (questions.length - 1 - 2) + 1)
    );
    return randomPrompts.map((prompt) => questions[prompt]);
  };

  const handleAnswerChange = (index, answer) => {
    setJournalData((prevData) => {
      const newAnswers = [...prevData.answers];
      newAnswers[index] = answer;

      return {
        ...prevData,
        answers: newAnswers,
      };
    });
  };

  const handleSave = () => {
    const user = firebase.auth().currentUser;

    if (user) {
      const journalEntry = {
        userId: user.uid,
        questions: journalData.questions,
        answers: journalData.answers,
      };

      const journalRef = ref(database, `journals/${user.uid}`);
      push(journalRef, journalEntry)
        .then(() => {
          console.log("Data successfully saved to Firebase!");
          // Reload the page after successful save
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error saving data to Firebase:", error);
        });
    }
  };

  return (
    <>
      {journalData.questions.map((question, index) => (
        <div key={index} className="mb-3">
          <label
            htmlFor={`exampleFormControlTextarea${index + 1}`}
            className="form-label"
          >
            {question}
          </label>
          <textarea
            className="form-control"
            id={`exampleFormControlTextarea${index + 1}`}
            rows="3"
            value={journalData.answers[index] || ""}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          ></textarea>
        </div>
      ))}
      <button type="button" className="btn btn-success" onClick={handleSave}>
        Save
      </button>
    </>
  );
};

export default NewJournal;
