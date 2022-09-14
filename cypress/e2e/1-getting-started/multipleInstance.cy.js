describe('no instance dashboard page', () => {

    beforeEach(() => {  
      cy.visit('http://localhost:3000/');
      cy.get('input[name="username"]')
            .type('nishant.kumar@veersatech.com', {force: true})
        cy.get('input[name="password"]')
            .type('KIPU-test-1234', {force: true})

      // ensure valid email address
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        cy.get('input[name="username"]').invoke('val').should('match', validRegex)
  
        cy.get('form').submit();
        cy.get('[data-test="list-header"]',{timeout: 20000}).should('be.visible'); 
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })
    })
  
    it('Search component accessible', () => {
        // ensure search component is present 
        cy.get('input[placeholder="Search"]').should('be.visible');
        cy.get('input[placeholder="Search"]').type('No Result');
        cy.get('[data-test="message-header"]').should('have.text', 'No results');

        // ensure search is functional
        // cy.get('input[placeholder="Search"]').clear().invoke('val', 12).trigger('change', { data: '12' });
        // // cy.wait(2000)
        // cy.get('[data-test="table-list-item"]').should('have.length',1)
        // const list = cy.get('[data-test="table-list-item"]');
        // list.each((item)=> {
        //     cy.wrap(item).find('td').first().should('have.text','12 South')
        // })

        // ensure refresh button is present and clickable
        cy.get('[data-test="refresh-button"]').should('be.visible');
        cy.get('[data-test="refresh-button"]').should('be.enabled');

    })

    it('toggle switch is functional', () => {
        cy.get('[data-test="table-list"]').should('be.visible');
        cy.get('button[role="switch"]').click(); 
        cy.get('[data-test="card-list"]').should('be.visible');
    })

  })
