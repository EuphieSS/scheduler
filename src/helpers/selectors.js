//to revisit; refactor for more efficient code
/** expected result: an [] or similar to below
[
  {id: 1, time: '12pm', interview: null}
  {id: 2, time: '1pm', interview: null}
  {id: 3, time: '2pm', interview: {…}}
  ......
] */
export function getAppointmentsForDay(state, day) {
  const result = [];

  const filteredDay = state.days.filter(dayObj => dayObj.name === day);
  
  if(filteredDay.length === 0) {
    return filteredDay;
  }
  
  const appointments = filteredDay[0].appointments;
  
  appointments.forEach(appointment => {
    if (Object.keys(state.appointments).includes(appointment.toString())) {
      result.push(state.appointments[appointment]);
    }
  })

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
    
    for (const id in state.interviewers) {
      if (id === interview.interviewer.toString()) {
        result.interviewer = state.interviewers[id];
      }
    }
  } else {
    result = null;
  }
  
  return result;  
};