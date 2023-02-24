//to revisit; refactor for more efficient code
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