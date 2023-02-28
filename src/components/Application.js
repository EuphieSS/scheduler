import React from "react";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "components/Appointment";

import useApplicationData from "../hooks/useApplicationData"

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors"


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const interviewerArray = getInterviewersForDay(state, state.day);
  
  const appointmentArray = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)

    return (
      <Appointment
        key={appointment.id}
        // KEEPING BELOW FOR NOTES
        // { ...appointment } //If we want every key in an object to become a prop for a component, we can spread the object into the props definition
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewerArray}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )

  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        
        <hr className="sidebar__separator sidebar--centered" />
        
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
        </nav>
        
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {appointmentArray}
        {/** Due to CSS, the line below must be added to represent the last appointment for the day */}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
  
}
