/** expected result: an [] or similar to below
[
  {id: 1, time: '12pm', interview: null},
  {id: 2, time: '1pm', interview: null},
  {id: 3, time: '2pm', interview: {…}},
  ......
] */
export function getAppointmentsForDay(state, day) {
  const result = [];

  const filteredDay = state.days.filter(dayObj => dayObj.name === day);
  
  if(filteredDay.length === 0 || filteredDay === undefined) {
    return filteredDay;
  }
  
  const appointments = filteredDay[0].appointments;
  
  appointments.forEach(appointment => {
    if (Object.keys(state.appointments).includes(appointment.toString())) {
      result.push(state.appointments[appointment]);
    }
  });

  return result;
};


/** expected result: null or similar to below
{  
  "student": "Lydia Miller-Jones",
  "interviewer": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
} */
export function getInterview(state, interview) {
  let result = {};
  
  if (interview) {
    result.student = interview.student;
    
    let id = interview.interviewer;
    result.interviewer = state.interviewers[id];
  } else {
    result = null;
  }
  
  return result;
};


/** expected result: an [] or similar to below
[
  {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
  {
    id: 2,
    name: "Tori Malcolm",
    avatar: "https://i.imgur.com/Nmx0Qxo.png"
  }
  ......
] */
export function getInterviewersForDay(state, day) {
  const result = [];

  const filteredDay = state.days.filter(dayObj => dayObj.name === day);
  
  if(filteredDay.length === 0 || filteredDay === undefined) {
    return filteredDay;
  }
  
  const interviewers = filteredDay[0].interviewers;
  
  interviewers.forEach(interviewer => {
    if (Object.keys(state.interviewers).includes(interviewer.toString())) {
      result.push(state.interviewers[interviewer]);
    }
  });

  return result;
};