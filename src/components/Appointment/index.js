import React from "react";

import "components/Appointment/styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const { time, interview } = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode( //set up initial modes
    interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      {/** All <Appointment> components will render a <Header> that takes in a time prop */}
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          // onEdit={onEdit}
          // onDelete={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={[]}
          onCancel={() => back(EMPTY)}
        />
      )}
    </article>
  );
}