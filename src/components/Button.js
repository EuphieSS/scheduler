import React from "react";

import "components/Button.scss";
import classNames from "classnames";

// PROPS
// children (rmb, cannot be renamed)
// base
// confirm
// danger
// clickable
// disabled

export default function Button(props) {
  const { children, base, confirm, danger, onClick, disabled } = props;

  const buttonClass = classNames("button", {
    "button--confirm": confirm,
    "button--danger": danger
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