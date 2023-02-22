import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  const { name, spots, setDay, selected } = props;

  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  });

  return (
    <li className={dayListItemClass} onClick={() => setDay(name)}>
      <h2>{name}</h2>
      <h3>{spots} spots remaining</h3>
    </li>
  );
}