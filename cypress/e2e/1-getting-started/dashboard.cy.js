/// <reference types="cypress" />

describe('example to-do app', () => {


  beforeEach(() => {

    cy.log('banana')
  
    cy.visit('http://localhost:3000/')
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
  })
  })

  it('ensure login fields available', () => {
    cy.get('input[name="username"]').invoke('attr','name').should('eq', 'username')
    cy.get('input[name="password"]').invoke('attr','name').should('eq', 'password')

  })

  it('ensure sign in button is visible', () => {
    cy.get('button').contains('Sign in').then($button => {
      expect($button.is(':visible')).to.true
    })
  })

  it('ensure forgot password button is clickable', () => {
    cy.get('button').contains('Forgot your password?').then($button => {
      expect($button.is(':enabled')).to.true
    })

  })

  it('ensure sign in button is visible', () => {
    cy.get('button[type="submit"]').then($button => {
      expect($button.is(':visible')).to.true
    })

  })

  it('ensure successful sign in', async () => {
    // typing right credentials
    cy.get('input[name="username"]')
      .type('nishant.kumar@veersatech.com', {force: true})
    cy.get('input[name="password"]')
      .type('Nishant@123', {force: true})

    // checking if the input fields contain values before sign in
    cy.get('input[name="username"]').should('have.value', 'nishant.kumar@veersatech.com')
    cy.get('input[name="password"]').should('have.value', 'Nishant@123')
    cy.get('form').submit();
    
    //  checking if sign out button is visible after successfull sign in
    cy.get('[data-test="list-header"]',{timeout: 20000}).should('be.visible');
    cy.get('button').contains('Sign Out').should('be.visible');

    //  checking if toggle button is present to switch views
    cy.get('button[role="switch"]').should('be.visible');
    cy.get('button[role="switch"] + p').should('have.text','Card View')

    //  checking the redirection to landing page after clicking sign out
    cy.get('button').contains('Sign Out').click();
    cy.get('input[name="username"]',{timeout: 20000}).should('be.visible');
    cy.get('button[type="submit"]').then($button => {
      expect($button.is(':visible')).to.true
    })
  })

})
