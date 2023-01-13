
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', { username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
      blogs: '637ba8e376d13f755c65ac2c' })
    cy.visit('http://localhost:3000')
  })
  it('login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login function', function() {
    it('user can log in with right credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('user can not login with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salai')
      cy.get('#login-button').click()
      cy.get('#error-message')
        .should('contain', 'wrong credentials')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'mluukkai', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
        cy.get('#new-blog-button').click()
        cy.get('#title').type('Cypress created title')
        cy.get('#author').type('Cypress')
        cy.get('#url').type('https://testing.org')
        cy.get('#likes').type('3')
        cy.get('#add-button').click()
      })
    })

    it('A blog can be created', function() {
      cy.get('#list-of-blogs')
        .should('contain', 'Cypress created title')
    })

    it('A blog can be liked', function() {
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.get('#list-of-blogs')
        .should('contain', 'Likes: 4')
    })
    it('A user who created the blog can remove it', function() {
      cy.get('#view-button').click()
      cy.get('#delete-button').click()
      cy.on('window:confirm', () => true)
      cy.get('#list-of-blogs')
        .should('not.contain', 'Cypress created title')
    })
    it('Blogs are in in descending order by likes', function() {
      cy.get('#new-blog-button').click()
      cy.get('#title').type('Second Cypress created title')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://testing.org')
      cy.get('#likes').type('2')
      cy.get('#add-button').click()
      cy.get('#list-of-blogs').eq(0).should('contain', 'Cypress created title')
      cy.get('#new-blog-button').click()
      cy.get('#title').type('Third Cypress created title')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('https://testing.org')
      cy.get('#likes').type('4')
      cy.get('#add-button').click()
      cy.get('#list-of-blogs').eq(0).should('contain', 'Third Cypress created title')
    })
  })
})