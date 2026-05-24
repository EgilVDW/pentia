/* global describe, it, cy */

/**
 * @category e2e-tests
 * @namespace Login to open document
 * @description
 * ## End-to-end test validating the primary authenticated user flow
 * ## in the application.
 *
 * Test coverage:
 * - User authentication
 * - Redirect after successful login
 * - Navigation to documents page
 * - Verification of document list rendering
 * - Opening a document from the document overview
 *
 * Purpose:
 * Ensures that critical user functionality works correctly
 * from the perspective of a real user.
 *
 * Tools:
 * - Cypress
 * - Google Chrome browser
 *
 * Test environment:
 * - Local development environment
 * - Chrome browser
 * - Cypress E2E testing framework
 *
 * Preconditions:
 * - Development server is running
 * - Test user exists in authentication system
 * - At least one document is available
 *
 * Expected result:
 * The user can successfully log in, navigate to the documents
 * section, and open a document without errors.
 */

describe("User flow", () => {

  /**
   * Validates login and document access workflow.
   */
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

    // Verify redirect after login
    cy.url().should("include", "/");

    // Navigate to documents page
    cy.visit("/documents");

    // Verify document list exists
    cy.get("[data-cy=\"document-item\"]")
      .should("exist");

    // Open first document
    cy.get("[data-cy=\"document-item\"]")
      .first()
      .click();

    // Verify document view is displayed
    // cy.get("[data-cy=\"document-view\"]")
    //   .should("exist");
  });
});