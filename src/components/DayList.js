import React from "react";

import DayListItem from "components/DayListItem";


export default function DayList(props) {
  const { days, value, onChange } = props;

  const dayList = days;
  const dayArray = dayList.map(item => {
    return (
      <DayListItem
        key={item.id}
        name={item.name}
        spots={item.spots}
        selected={item.name === value}
        setDay={() => onChange(item.name)}
      />
    );
  });

  return (
    <ul>
      {dayArray}
    </ul>
  );
}