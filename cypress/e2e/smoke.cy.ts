describe('open gear setting panel', () => {
	context('large screen resolution', () => {
		beforeEach(() => {
			cy.viewport(1300, 960);
		});
		it('should be able to select a different editor option', () => {
			cy.visit('http://localhost:3000');
			cy.findByTestId('gear-icon').click();
			cy.findByTestId('editorType').select('Text').should('have.value', 'text');
		});
	});
});
