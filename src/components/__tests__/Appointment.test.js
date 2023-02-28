import React from "react";

import { render } from "@testing-library/react"; //The render function allows Components to render

import Appointment from "components/Appointment/index";


describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  xit("does something it is supposed to do", () => {
    // ...
  }); //one way to skip test

  test.skip("does something else it is supposed to do", () => {
    // ...
  }); //another way to skip test

});