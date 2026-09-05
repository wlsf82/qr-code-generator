// The color input is React-controlled, so a value set through jQuery is
// swallowed by React's value tracker. Setting it through the native setter
// and dispatching an input event is what makes React pick the new color up.
const setFrameColor = color =>
  cy.get('#frame-color').then($input => {
    const input = $input[0]
    const nativeSetter = Object.getOwnPropertyDescriptor(
      input.ownerDocument.defaultView.HTMLInputElement.prototype,
      'value'
    ).set
    nativeSetter.call(input, color)
    input.dispatchEvent(new Event('input', { bubbles: true }))
  })

describe('QR Code Generator', () => {
  beforeEach(() => {
    cy.visit('https://v0-gerador-de-qr-code-tat.vercel.app/')
  })

  it('successfully generates a QR code, dowloads it, and access the website enconded in it', () => {
    cy.get('input[placeholder="https://exemplo.com"]').type('https://walmyr.dev')
    cy.contains('button', 'Gerar').click()
    cy.contains('button', 'Baixar QR Code').click()

    cy.readFile('./cypress/downloads/qrcode.png', 'base64')
      .then(base64 => cy.task('decodeQRFromBase64', base64, { log: false }))
      .then(encodedUrl => encodedUrl)
      .then(url => {
        cy.visit(url)
        cy.url().should('be.equal', 'https://walmyr.dev/')
      })
  })

  it('successfully generates a customized QR code (with a logo), downloads it, and access the website enconded in it', () => {
    cy.get('input[placeholder="https://exemplo.com"]').type('https://talkingabouttesting.school')
    cy.get('#logo-upload').selectFile('./cypress/fixtures/cy-icon.png', { force: true })
    cy.contains('button', 'Gerar').click()
    cy.contains('button', 'Baixar QR Code').click()

    cy.readFile('./cypress/downloads/qrcode.png', 'base64')
      .then(base64 => cy.task('decodeQRFromBase64', base64, { log: false }))
      .then(encodedUrl => encodedUrl)
      .then(url => {
        cy.visit(url)
        cy.url().should('be.equal', 'https://talkingabouttesting.school/')
      })
  })

  it('successfully generates a QR code with a colored frame, downloads it, and access the website encoded in it', () => {
    cy.get('input[placeholder="https://exemplo.com"]').type('https://walmyr.dev')
    cy.contains('button', 'Gerar').click()
    cy.get('#frame-toggle').click()
    setFrameColor('#ff0000')
    cy.get('div.rounded-2xl').should('have.css', 'background-color', 'rgb(255, 0, 0)')
    cy.contains('button', 'Baixar QR Code').click()

    cy.readFile('./cypress/downloads/qrcode.png', 'base64')
      .then(base64 => cy.task('decodeQRFromBase64', base64, { log: false }))
      .then(encodedUrl => encodedUrl)
      .then(url => {
        cy.visit(url)
        cy.url().should('be.equal', 'https://walmyr.dev/')
      })
  })

  it('successfully generates a QR code with a colored frame and a title, downloads it, and access the website encoded in it', () => {
    cy.get('input[placeholder="https://exemplo.com"]').type('https://talkingabouttesting.school')
    cy.contains('button', 'Gerar').click()
    cy.get('#frame-toggle').click()
    setFrameColor('#0000ff')
    cy.get('#frame-title').type('Escaneie-me')
    cy.get('div.rounded-2xl')
      .should('have.css', 'background-color', 'rgb(0, 0, 255)')
      .and('contain', 'Escaneie-me')
    cy.contains('button', 'Baixar QR Code').click()

    cy.readFile('./cypress/downloads/qrcode.png', 'base64')
      .then(base64 => cy.task('decodeQRFromBase64', base64, { log: false }))
      .then(encodedUrl => encodedUrl)
      .then(url => {
        cy.visit(url)
        cy.url().should('be.equal', 'https://talkingabouttesting.school/')
      })
  })
})
