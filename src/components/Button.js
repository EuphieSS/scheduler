import React from "react";

import "components/Button.scss";
import classNames from "classnames";

// PROPS
// children (rmb, cannot be renamed): string
// base: 
// confirm: string
// danger: string
// onClick: action
// disabled: string

export default function Button(props) {
  const { children, base, confirm, danger, onClick, disabled } = props;

  const buttonClass = classNames("button", {
    "button--confirm": confirm, //if props.confirm is true, append className
    "button--danger": danger //same logic as above
  });

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}