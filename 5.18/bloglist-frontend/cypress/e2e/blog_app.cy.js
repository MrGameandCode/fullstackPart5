/* eslint-disable no-undef */
describe('Blog app', function () {
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Cypress',
            username: 'cypress_user',
            password: '1234'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.contains('blogs')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('cypress_user')
            cy.get('#password').type('1234')
            cy.get('#login').click()
            cy.contains('Cypress logged in')
            cy.get('#logout').click()
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('i_dont_exist')
            cy.get('#password').type('what_is_that?')
            cy.get('#login').click()
            cy.contains('Wrong username or password')
        })
    })
})