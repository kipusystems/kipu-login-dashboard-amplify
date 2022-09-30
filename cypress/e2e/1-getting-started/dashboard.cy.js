/// <reference types="cypress" />

describe('landing page', () => {

  // const locations = ['Atlanta Recovery Place', 'Family First Adolescent Services', 'House of Freedom', 'Illumination Foundation', 'Daybreak Treatment Solutions ',
  //                   'ClearVision Health and Wellness', 'Second Chance Recovery Center']; 

  beforeEach(() => {
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
    cy.get('button').contains('Sign in').should('be.visible');
  })

  it('ensure forgot password button is clickable', () => {
    cy.get('button').contains('Forgot your password?').should('be.enabled');
  })

  it('ensure sign in button is visible', () => {
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('ensure successful sign in', async () => {
    // typing right credentials
    cy.get('input[name="username"]')
      .type('nishant.kumar@veersatech.com', {force: true})
    cy.get('input[name="password"]')
      .type('KIPU-test-1234', {force: true})

    // checking if the input fields contain values before sign in
    cy.get('input[name="username"]').should('have.value', 'nishant.kumar@veersatech.com')
    cy.get('input[name="password"]').should('have.value', 'KIPU-test-1234')
    
    // ensure valid email address
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    cy.get('input[name="username"]').invoke('val').should('match', validRegex)
  
    cy.get('form').submit();
    
    //  checking if sign out button is visible after successfull sign in
    cy.get('[data-test="list-header"]',{timeout: 20000}).should('be.visible');
    cy.get('button').contains('Sign Out').should('be.visible');

    //  checking if toggle button is present to switch views
    cy.get('button[role="switch"]').should('be.visible');
    cy.get('button[role="switch"] + p').should('have.text','Cards')
    
    //  checking if instances are visible  
    const list = cy.get('[data-test="table-list-item"]');
    list.each((item,index)=> {
      cy.wrap(item).find('td').first().invoke('text').then(text=> {
        expect(text.length).to.be.at.least(1);
      });
    })

    // checking if launch link are working
    cy.get('td a').each((item, index) => {
      cy.request(item.prop('href'))
      cy.wrap(item).invoke('attr','target').should('eq','_blank')
    })


    //  checking the redirection to landing page after clicking sign out
    cy.get('[data-test="sign-out"]').click();
    cy.get('input[name="username"]',{timeout: 20000}).should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  })
})

