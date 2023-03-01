describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset"); //reset database, otherwise the test will fail on rerun because the appointment spot is already populated from the first run
  
    cy.visit("/");
  
    cy.contains("Monday");

  });


  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']")
      .click();

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");

    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });


  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({force: true});
      /** The edit button is only revealed when we hover over the appointment. When we try and click on it, it will start "waiting for actionability". We want to use the click arguments to force the action and disable "waiting for actionability". */

    cy.get("[alt='Tori Malcolm']").click();

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");

    cy.contains(".appointment__card--show", "Tori Malcolm");

  });


  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({force: true});

    cy.contains("Confirm")
      .click();

    cy.contains("Deleting")
      .should("exist");

    cy.contains("Deleting")
      .should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");

  });

});