import React, { useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";

import { getAppointmentsForDay } from "helpers/selectors"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentArray = dailyAppointments.map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment} //If we want every key in an object to become a prop for a component, we can spread the object into the props definition
        // KEEPING BELOW FOR NOTES
        // id={appointment.id}
        // time={appointment.time}
        // interview={appointment.interview}
      />
    )
  });

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"), //because of the proxy in package.json, no need to include http://localhost:8001
      Axios.get("/api/appointments"),
      // Axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev,
        days: all[0].data,
        appointments: all[1].data,
        // interviewers: all[2].data 
      }));
    });
  }, []); //the empty array allows the requests to run once after the component renders for the first time, and prevents the infinite loop of rerunning this effect

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
