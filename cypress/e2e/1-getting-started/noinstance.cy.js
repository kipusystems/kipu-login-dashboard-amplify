/// <reference types="cypress" />

describe('no instance dashboard page', () => {

    beforeEach(() => {  
      cy.visit('http://localhost:3000/')
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    })
  
    it('ensure no instance message is displayed', () => {
        cy.get('input[name="username"]')
            .type('noinstance@kipu.com', {force: true})
        cy.get('input[name="password"]')
            .type('KIPU-test-1234', {force: true})

      // ensure valid email address
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        cy.get('input[name="username"]').invoke('val').should('match', validRegex)
  
        cy.get('form').submit();
        cy.get('[data-test="list-header"]',{timeout: 20000}).should('be.visible');
        cy.get('[data-test="message-header"]').should('have.text', 'You do not have access to any accounts. Please contact your administrator');
      
    })
  })
