# qr-code-generator

[![CI](https://github.com/wlsf82/qr-code-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/wlsf82/qr-code-generator/actions/workflows/ci.yml)

An automated E2E test suite using Cypress to validate the [QR Code Generator](https://v0-gerador-de-qr-code-sepia.vercel.app/) application.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

## Installation

```bash
npm install
```

## Running the tests

You can run the tests in two modes:

### Headless mode (CLI)

```bash
npm test
```

### Interactive mode (Cypress App)

```bash
npm run cy:open
```

## Project Structure

- [cypress/e2e/qrCodeGen.cy.js](cypress/e2e/qrCodeGen.cy.js): Contains the E2E test that generates, downloads, and decodes a QR code.
- [cypress/support/tasks/index.js](cypress/support/tasks/index.js): Custom Cypress tasks (e.g., `decodeQRFromBase64`) for verifying QR code content using `jimp` and `jsqr`.
- [cypress.config.js](cypress.config.js): Cypress configuration file.

## Author

[Walmyr](https://walmyr.dev/)
