describe('Redux store testing', () => {

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
        cy.get('[data-test="card-list"]',{timeout: 20000}).should('be.visible'); 

        cy.get('button[role="switch"]').click(); 

        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        })
    })

    it('check whether states are available when application is loaded',() => {
        cy.window().its('store').invoke('getState').then(store=>{
            expect(store.accounts).to.be.exist;
            expect(store.user).to.be.exist;
            expect(store.queryResult).to.be.exist;
            expect(store.showQueryResult).to.be.exist;
            expect(store.messageBody).to.be.exist;
            expect(store.displayMessage).to.be.exist;
            expect(store.currentPage).to.be.exist;
            expect(store.offset).to.be.exist;
            expect(store.rowsPerPage).to.be.exist;
            expect(store.alert).to.be.exist;
            expect(store.isLoading).to.be.exist;
            expect(store.toggleView).to.be.exist;
        })
    })

    it('check user and accounst have appropriate values when logged in',() => {
        cy.window().its('store').invoke('getState').then(store=>{
            expect(store.accounts.value).to.have.length.gt(0);
            cy.wrap(typeof(store.accounts.value[0])).should('eq','object')
            expect(store.user).to.be.exist;
            expect(store.user.value.email).to.be.exist;
        })
    })

    it('check whether search states are available when no results',() => {
        cy.get('input[placeholder="Search by Name"]').should('be.visible');
        cy.get('input[placeholder="Search by Name"]').type('No Result');
        cy.get('[data-test="message-header"]').should('have.text', 'No results');
        cy.window().its('store').invoke('getState').then(store=>{
            cy.wrap(store.queryResult.value).should('have.length',0);
            cy.wrap(store.messageBody.value).should('have.length.greaterThan',0);
            cy.wrap(store.showQueryResult.value).should('equal',true);
            cy.wrap(store.displayMessage).should('deep.equal',{ value:true });
        })
    })

    it('check whether search states are available when some results',() => {
        cy.get('input[placeholder="Search by Name"]').clear().type('12', {force: true});
        cy.window().its('store').invoke('getState').then(store=>{
            cy.wrap(store.queryResult.value).should('have.length.greaterThan',0);
            cy.wrap(store.messageBody.value).should('have.length',0);
            cy.wrap(store.showQueryResult.value).should('equal',true);
            cy.wrap(store.displayMessage).should('deep.equal',{ value:false });
        })
    })
  })
