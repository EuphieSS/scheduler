import React, { useState, useEffect } from "react";
import Axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";


///////////// MOCK DATA /////////////
const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));

  const appointmentList = Object.values(appointments); //To transform appointments into an array so it can be mapped
  const appointmentArray = appointmentList.map(appointment => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment} //If we want every key in an object to become a prop for a component, we can spread the object into the props definition
        // id={appointment.id}
        // time={appointment.time}
        // interview={appointment.interview}
      />
    )
  });

  useEffect(() => {
    Axios.get("/api/days") //use axios to make a request as a side effect and update the component when data is retrieved
      .then(response => {
        setDays(response.data); //response.data is an array of day objects; setDays sets this array as the value of days
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }, []); //the empty array allows the request to run once after the component renders for the first time, and prevents the infinite loop of rerunning this effect

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
