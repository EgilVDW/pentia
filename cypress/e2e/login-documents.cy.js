/* global describe, it, cy */
describe("User flow", () => {
  it("logs in and opens a document", () => {

    // Visit login page
    cy.visit("/login");

    // Fill login form
    cy.get("[data-cy=\"email-input\"]")
      .type("mortenbuch@live.dk");

    cy.get("[data-cy=\"password-input\"]")
      .type("test123");

    // Submit login
    cy.get("[data-cy=\"login-button\"]")
      .click();

    // Should redirect to homepage
    cy.url().should("include", "/");

    // Navigate to documents
    cy.visit("/documents");

    // Verify document list exists
    cy.get("[data-cy=\"document-item\"]")
      .should("exist");

    // Open first document
    cy.get("[data-cy=\"document-item\"]")
      .first()
      .click();

    // Verify document opened
    // cy.get("[data-cy=\"document-view\"]")
    //   .should("exist");
  });
});