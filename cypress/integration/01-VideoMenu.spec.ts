/// <reference types="cypress" />
describe('tests the video menu',()=>{
    before(()=>{
        localStorage.clear()
        cy.visit('http://localhost:3000')
    })
    it('opens the menu',()=>{
        const menuButton = cy.get('#menu-button')
        menuButton.click()
    })

    it('enters a video link',()=>{
        let linkInput = cy.get('#link-input')
        const link = `https://www.youtube.com/watch?v=rdHsK_LTLTk`
        linkInput.clear()
        linkInput.type(link)
        linkInput.should('have.value',`${link}`)
    })
    it('closes the menu',()=>{
        const menuButton = cy.get('#menu-button')
        menuButton.click()
    })
})
export {
  
}