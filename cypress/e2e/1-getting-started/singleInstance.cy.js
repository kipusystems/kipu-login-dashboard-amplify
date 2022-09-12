/// <reference types="cypress" />

describe('single instance dashboard', () => {

    beforeEach(() => {  
      cy.visit('http://localhost:3000/')
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    })
  
    it('ensure single instance redirects to instance', () => {
        cy.get('input[name="username"]')
            .type('singleinstance@kipu.com', {force: true})
        cy.get('input[name="password"]')
            .type('KIPU-test-1234', {force: true})

      // ensure valid email address
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        cy.get('input[name="username"]').invoke('val').should('match', validRegex)
     
        cy.get('form').submit();
  
        cy.get('[data-test="list-header"]',{timeout: 20000}).should('be.visible');
        cy.url().should('include','/users/sign_in')
    })
})
