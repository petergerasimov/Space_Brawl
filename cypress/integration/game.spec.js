/* eslint-disable */

describe('Test Game', () => {
  it('Check if game loads', () => {
    cy.visit('/');
    cy.wait(1000).then( () => {
      cy.getPixiApp().then(app => {
        expect(app.game).to.exist;
      });
    });
  });

  it('Check for tutorial', () => {
    cy.wait(1000).then(() => {
      cy.getPixiApp().then(app => {
        expect(app.game.children[0].name).to.equal('tutorial');
      });
    });
  });

  it('All tutorial slides are displayed', () => {
    cy.getPixiApp().then(app => {
      const slides = app.game.children[0]._slides;

      expect(slides.slides.length).to.equal(2);

      for (let i = 0; i < slides.slides.length + 1; i++) {
        slides.button.emit('click');
      }

      cy.wait(500).then(() => {
        expect(app.game.children[0].name).to.equal('countdown');
      });
    });
  });

  it('Countdown is displayed', () => {
    cy.getPixiApp().then(app => {
      expect(app.game.children[0].name).to.equal('countdown');
    });
  });

  it('Game is replayed', () => {
    cy.getPixiApp().then(app => {
      cy.wait(3000).then(() => {
        app.game.children[0]._player.healthbar.subtractHealth(100);
        cy.wait(1000).then(() => {
          app.game.children[0]._button.emit('click');
          cy.wait(500).then(() => {
            expect(app.game.children[0].name).to.equal('countdown');
          });
        });
        
      });
    });
  });

});