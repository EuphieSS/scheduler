import React from "react";

import "components/Appointment/styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment(props) {
  const { time, interview } = props;

  return (
    <article className="appointment">
      {/** All <Appointment> components will render a <Header> that takes in a time prop */}
      <Header time={time} />
      {interview ?
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
        : <Empty />
      }
    </article>
  );
}