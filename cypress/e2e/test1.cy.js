describe('website sauce-demo', () => {
    it('test EndtoEnd' , () => {
        //Acces URL
        cy.visit('https://tutorialsninja.com/demo/index.php?route=account/register');
        //Insciption
        cy.get('[id="input-firstname"]').clear().type('john');
        cy.get('[id="input-lastname"]').clear().type('Smith');
        cy.get('[id="input-email"]').clear().type('testemail@yopmail.com');
        cy.get('[id="input-telephone"]').clear().type('060102030405');
        cy.get('[id="input-password"]').clear().type('pass@123');
        cy.get('[id="input-confirm"]').clear().type('pass@123');
        cy.get('[type="checkbox"]').click();
        cy.wait(1000);
        cy.get('.btn.btn-primary').click();
        //Authentification
        cy.contains('Login').click({ force:true})
        cy.get(' [id="input-email"]').clear().type('testemail@yopmail.com');
        cy.get('[id="input-password"]').clear().type('pass@123');
        cy.get('[value="Login"]').click();
        //Search URL avec verification
        cy.get('.btn.btn-default.btn-lg').click();
        cy.url().should('include','/search');
        // Recherche produit valide avec verification
        cy.get('[id="input-search"]').clear().type('iMAC');
        cy.get('[name="category_id"]').select('Mac');
        cy.get('[id="button-search"]').click();
        cy.get('.img-responsive').should('be.visible');
        //Rechercher produit invalide avec verification et message
        cy.get('[name="category_id"]').select('test 15');
        cy.get('[id="button-search"]').click();
        cy.get('.img-responsive').should('not.exist');
        cy.contains('There is no product that matches the search criteria.').should('exist');
        //Rechercher un produit, verifier l'exactitude  du nombre des produits meme en changeant la vue de GRID ---> LIST
                   //recherche produit
        cy.get('[id="input-search"]').clear().type('MAC');
        cy.get('[name="category_id"]').select('All Categories');
        cy.get('[id="button-search"]').click();
                    //recuperer elements presents en GRID
                    cy.get('.product-layout').then(($gridItems) => {
                    // récupérer le texte de chaque produit
                    const gridTexts = $gridItems.toArray().map(el => el.innerText.trim());
                      
                    // switch to list view
                    cy.get('[id="list-view"]').click();
                      
                    // récupérer les items en list view
                    cy.get('.product-layout').then(($listItems) => {
                        const listTexts = $listItems.toArray().map(el => el.innerText.trim());
                      
                    // comparer les deux listes
                    expect(listTexts).to.deep.equal(gridTexts);
                        });
                      });
                    //Ajouter produit panier avec verification
                    cy.contains('button', 'Add to Cart').click();
                    cy.get('[id="cart-total"]').click();
                    cy.get('.img-thumbnail').should('be.visible');

                    //Supression + verification
                    cy.get('.fa.fa-times').click();
                    cy.get('.img-thumbnail').should('not.exist')

                    




        



        


        
        
       






       
    
    
    
    });
});
