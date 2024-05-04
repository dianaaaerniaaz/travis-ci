describe('Weather App', () => {
    it('should display weather information for a city', () => {
      cy.visit('http://localhost:4000/')
      cy.get('input[name="city"]').type('New York');
      cy.get('.ghost-button').click();
      cy.get('p').should('contain.text', 'New York');
    });
  });
  