import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {
  const { student, interviewer, interviewers, onSave, onCancel } = props;

  const [studentName, setStudent] = useState(student || "");
  const [interviewerId, setInterviewer] = useState(interviewer || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    onCancel();
    reset();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={studentName}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={interviewers}
          value={interviewerId}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} reset={reset}>Cancel</Button>
          <Button confirm onClick={() => onSave(studentName, interviewerId)}>Save</Button>
        </section>
      </section>
    </main>
  )
}