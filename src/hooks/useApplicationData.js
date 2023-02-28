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

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return Axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({ ...state, appointments });
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

    return Axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        setState({ ...state, appointments });
        console.log(response);
      })

  };

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"), //because of the proxy in package.json, no need to include http://localhost:8001
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers")
    ]).then((all) => {
      // console.log(all[0].data);
      // console.log(all[1].data);
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