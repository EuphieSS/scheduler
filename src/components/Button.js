import React from "react";

import "components/Button.scss";

// PROPS
// children (rmb, cannot be renamed)
// base
// confirm
// danger
// clickable
// disabled

export default function Button(props) {
 const { children, base, confirm, danger, onClick, disabled } = props;

  let buttonClass = "button";

  if (confirm) {
    buttonClass += " button--confirm";
  }
  if (danger) {
    buttonClass += " button--danger";
  }

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