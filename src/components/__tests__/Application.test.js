import React from "react";

import { 
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getByAltText,
  getAllByTestId,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText,
  queryByAltText
} from "@testing-library/react";

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
    const { container, debug } = render(<Application />); //Render the Application

    await waitForElement(() => getByText(container, "Archie Cohen")); //Wait until the text "Archie Cohen" is displayed

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add")); //Click the "Add" button on the first empty appointment

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones"}
    }); //Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name"
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer")); //Click the first interviewer in the list
    
    fireEvent.click(getByText(appointment, "Save")); //Click the "Save" button on that same appointment

    expect(getByText(appointment, "Saving")).toBeInTheDocument(); //Check that the element with the text "Saving" is displayed

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument(); //Wait until the element with the text "Lydia Miller-Jones" is displayed
    //alternative for above two lines
    //await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument(); //Check that the DayListItem with the text "Monday" also has the text "no spots remaining"

  });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    ); //refer to index.js <article data-testid="appointment">

    fireEvent.click(queryByAltText(appointment, "Delete")); //refer to Show.js <img alt="Delete" />

    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument(); //refer to Confirm.js with message prop from index.js

    fireEvent.click(queryByText(appointment, "Confirm")); //refer to Confirm button in Confirm.js

    expect(getByText(appointment, "Deleting")).toBeInTheDocument(); //refer to Status.js with message prop from index.js

    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));
    expect(getByAltText(appointment, "Add")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    ); //refer to DayListItem.js <li data-testid="day">

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument(); //refer to Show.js {interviewer.name} prop from index.js

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });

});


