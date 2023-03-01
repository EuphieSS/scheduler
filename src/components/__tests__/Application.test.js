import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getByAltText, getAllByTestId, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);


describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    /** try/catch blocks not needed here for async/await because this is test code. 
        If there is an error, fix the test */
    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones"}
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    console.log(prettyDOM(appointment));
  });

});


