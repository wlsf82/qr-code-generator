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
    cy.get('input[placeholder="https://exemplo.com"]').type('https://cypresssimulator.com')
    cy.get('#logo-upload').selectFile('./cypress/fixtures/cy-icon.png', { force: true })
    cy.contains('button', 'Gerar').click()
    cy.contains('button', 'Baixar QR Code').click()

    cy.readFile('./cypress/downloads/qrcode.png', 'base64')
      .then(base64 => cy.task('decodeQRFromBase64', base64, { log: false }))
      .then(encodedUrl => encodedUrl)
      .then(url => {
        cy.visit(url)
        cy.url().should('be.equal', 'https://cypresssimulator.com/')
      })
  })
})
