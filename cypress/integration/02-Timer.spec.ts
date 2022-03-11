/// <reference types="cypress" />


// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('tests the timer', () => {
 
  it('enters hour with malformed inputs',()=>{
    const hr = cy.get("#hr")

    hr.type('ab')
    hr.should('have.value','0')

  })
  it('enters minutes',()=>{
    const min = cy.get("#min")

    min.clear()
    min.type('00')
    min.should('have.value','00')
  })
  it('enters the seconds',()=>{
    const sec = cy.get("#sec")
    sec.clear()
    let time = '30'
    sec.type(time)
    sec.should('have.value',time)

  })
    it('plays the timer',(done)=>{
      const btn = cy.get('#play-button')

    btn.click()
    setTimeout(()=>{
      const secDisplay = cy.get('#sec-display')
      secDisplay.should('have.value','03')
      done()
    },3100)
  })
})
it('stop playing the timer',(done)=>{
  const btn = cy.get('#play-button')

  btn.click()

  done()

})
export {
  
}