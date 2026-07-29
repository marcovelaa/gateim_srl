# Contact Form Specification

## Purpose

Define the behavior of the contact form including client-side interaction, server-side processing, anti-spam protection, and email delivery.

## Requirements

### Requirement: Form Fields

The contact form MUST include fields for: nombre (required), empresa (optional), teléfono (optional), correo electrónico (required, validated), and mensaje (required). A hidden honeypot field MUST be present.

#### Scenario: Valid form submission

- GIVEN a user fills in nombre, correo electrónico, and mensaje
- WHEN they click "Enviar Mensaje"
- THEN the form submits via fetch POST to `/api/contacto`
- AND a success message displays without page reload

#### Scenario: Invalid email rejection

- GIVEN a user enters an invalid email format
- WHEN they attempt to submit
- THEN client-side validation prevents submission
- AND an error message indicates the email format is invalid

### Requirement: Server-Side Processing

The Cloudflare Pages Function at `functions/api/contacto.js` MUST validate and sanitize all fields server-side. It MUST reject requests where the honeypot field contains content. It MUST NOT trust client-side validation alone.

#### Scenario: Honeypot catches bot

- GIVEN a bot fills the hidden honeypot field with content
- WHEN the form is submitted
- THEN the server returns a 200 response (to not alert the bot)
- AND no email is sent

#### Scenario: Server validates missing required fields

- GIVEN a POST request arrives with empty nombre
- WHEN the function processes it
- THEN it returns a 400 error with a descriptive message

### Requirement: Email Delivery

The function MUST send the form data via the Resend API to GATEIM's configured email address. The Resend API key MUST be stored as a Cloudflare Pages environment variable, never in client-side code.

#### Scenario: Successful email delivery

- GIVEN valid form data passes server validation
- WHEN the Resend API is called
- THEN an email is delivered to the configured GATEIM address
- AND the client receives a success response

#### Scenario: Resend API failure

- GIVEN valid form data but Resend API returns an error
- WHEN the function processes the response
- THEN the client receives a 500 error with a user-friendly message
- AND no sensitive error details are exposed

### Requirement: Security

API keys and secrets MUST NOT appear in any client-side code or `.astro` files. The function MUST set appropriate CORS headers. The form MUST work without JavaScript for basic HTML submission (progressive enhancement) but SHOULD use fetch for enhanced UX.

#### Scenario: API key not exposed

- GIVEN a user views the page source or network requests
- WHEN they search for the Resend API key
- THEN no API key is found in any client-accessible resource
