import React from "react";

import DayListItem from "components/DayListItem";


export default function DayList(props) {
  const { days, day, setDay } = props;

  const dayList = days;
  const dayArray = dayList.map(item => {
    return (
      <DayListItem
        key={item.id}
        name={item.name}
        spots={item.spots}
        selected={item.name === day}
        setDay={() => setDay(item.name)}
      />
    );
  });

  return (
    <ul>
      {dayArray}
    </ul>
  );
}