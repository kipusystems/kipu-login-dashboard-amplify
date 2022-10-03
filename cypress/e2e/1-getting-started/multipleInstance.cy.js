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

        // checking whether spinner is present before list is rendeered
        cy.get('[data-test="spinner"').should('be.visible')
        cy.get('[data-test="spinner"',{timeout:20000}).should('not.exist')
        cy.get('[data-test="table-list"]',{timeout: 20000}).should('be.visible'); 

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    })

    it('check if pagination present when account is more than 5',() => {
        cy.get('#total-accounts').invoke('text').then(parseInt).then(total=> {
            cy.log(total)
            if(total>5) cy.get('[data-test="page-link"]').should('have.length.at.least', 2);
        })
    })

    it('pagination link is functional', () => {
        const list = cy.get('[data-test="page-link"]');
        list.each((link,index) => {
            cy.get('[data-test="table-list"]').invoke('text').then( item => { 
                cy.get('[data-test="page-link"]',{timeout: 20000}).eq(index).should('have.class','tw-bg-k-purple-600');
                cy.get('[data-test="right-arrow"]').click();
                cy.get('[data-test="table-list"]',{timeout: 20000}).should('be.visible'); 
                if(index < cy.get('[data-test="page-link"]') - 1) cy.get('[data-test="table-list"]').invoke('text').should('not.equal',item);
            });
        })
    })
  
    it('Search component accessible', () => {
        // ensure refresh button is present and clickable
        cy.get('[data-test="refresh-button"]').should('be.visible');
        cy.get('[data-test="refresh-button"]').should('be.enabled');

        // ensure search component is present 
        cy.get('input[placeholder="Search by Name"]').should('be.visible');
        cy.get('input[placeholder="Search by Name"]').type('No Result');
        cy.get('[data-test="message-header"]').should('have.text', 'No results');
        
        // ensure reset search button is present
        cy.get('[data-test="reset-search"]').should('be.visible');       
    })

    it('Search component with some results', () => {
        cy.get('input[placeholder="Search by Name"]').clear().type('12', {force: true});
        cy.get('[data-test="table-list-item"]').should('have.length',1)
        const list = cy.get('[data-test="table-list-item"]');
        list.each((item)=> {
            cy.wrap(item).find('td').first().should('have.text','12 South')
        })
    })

    it('toggle switch is functional', () => {
        cy.get('[data-test="table-list"]').should('be.visible');
        cy.get('button[role="switch"]').click(); 
        cy.get('[data-test="card-list"]').should('be.visible');
    })
  })
