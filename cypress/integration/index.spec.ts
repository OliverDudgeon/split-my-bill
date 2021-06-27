it('Basic flow', () => {
  cy.visit('/');
  cy.location('pathname').should('eq', '/');
  cy.viewport('macbook-13');

  // App.tsx
  cy.location('pathname').should('eq', '/');
});
