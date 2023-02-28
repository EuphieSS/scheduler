import { useState, useEffect } from "react";
import Axios from "axios";


export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const findDayIndex = (day) => {
    const dayIndices = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return dayIndices[day];
  }

  const dayIndex = findDayIndex(state.day);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    let updatedSpots = {
      ...state.days[dayIndex],
      spots: state.days[dayIndex]
    }

    if (!state.appointments[id].interview) {
      updatedSpots = {
        ...state.days[dayIndex],
        spots: state.days[dayIndex].spots - 1
      }
    } else {
      updatedSpots = {
        ...state.days[dayIndex],
        spots: state.days[dayIndex].spots
      }
    }

    const days = [...state.days];
    days[dayIndex] = updatedSpots;

    return Axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({ ...state, appointments, days });
        console.log(response);
      })

  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedSpots = {
      ...state.days[dayIndex],
      spots: state.days[dayIndex].spots + 1
    }

    const days = [...state.days];
    days[dayIndex] = updatedSpots;

    return Axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        setState({ ...state, appointments, days });
        console.log(response);
      })

  };

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"), //because of the proxy in package.json, no need to include http://localhost:8001
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers")
    ]).then((all) => {
      console.log(all[0].data);
      console.log(all[1].data);
      // console.log(all[2].data);
      setState(prev => ({...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []); //the empty array allows the requests to run once after the component renders for the first time, and prevents the infinite loop of rerunning this effect

  return { state, setDay, bookInterview, cancelInterview };

}