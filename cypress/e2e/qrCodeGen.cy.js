// The frame color is an `input[type="color"]`, which cannot be typed into and
// whose native picker is an OS dialog. Setting the value through React's own
// value setter is what makes the app pick the change up.
const setFrameColor = color => {
  cy.get('#frame-color').then($input => {
    const input = $input[0]
    const win = input.ownerDocument.defaultView
    const setValue = Object.getOwnPropertyDescriptor(
      win.HTMLInputElement.prototype,
      'value'
    ).set

    setValue.call(input, color)
    input.dispatchEvent(new win.Event('input', { bubbles: true }))
  })
}

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

  it('successfully generates a QR code with a colored frame, downloads it, and access the website enconded in it', () => {
    cy.get('input[placeholder="https://exemplo.com"]').type('https://walmyr.dev')
    cy.get('#frame-toggle').click()
    cy.get('#frame-toggle').should('have.attr', 'aria-checked', 'true')
    setFrameColor('#ff0000')
    cy.get('#frame-color').should('have.value', '#ff0000')
    cy.contains('button', 'Gerar').click()
    cy.contains('button', 'Baixar QR Code').click()

    cy.readFile('./cypress/downloads/qrcode.png', 'base64')
      .then(base64 => cy.task('decodeQRFromBase64', base64, { log: false }))
      .then(url => {
        cy.visit(url)
        cy.url().should('be.equal', 'https://walmyr.dev/')
      })
  })

  it('successfully generates a QR code with a colored frame and a title, downloads it, and access the website enconded in it', () => {
    cy.get('input[placeholder="https://exemplo.com"]').type('https://talkingabouttesting.school')
    cy.get('#frame-toggle').click()
    cy.get('#frame-toggle').should('have.attr', 'aria-checked', 'true')
    cy.get('#frame-title').type('Acesse meu site')
    cy.get('#frame-title').should('have.value', 'Acesse meu site')
    setFrameColor('#1e40af')
    cy.get('#frame-color').should('have.value', '#1e40af')
    cy.contains('button', 'Gerar').click()
    cy.contains('button', 'Baixar QR Code').click()

    cy.readFile('./cypress/downloads/qrcode.png', 'base64')
      .then(base64 => cy.task('decodeQRFromBase64', base64, { log: false }))
      .then(url => {
        cy.visit(url)
        cy.url().should('be.equal', 'https://talkingabouttesting.school/')
      })
  })
})
