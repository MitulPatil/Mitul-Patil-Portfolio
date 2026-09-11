# Mitul Patil Portfolio

A modern, responsive developer portfolio built to showcase full-stack projects, AI integration work, technical skills, experience, and contact information.

The portfolio is designed with a clean visual system, responsive layouts, smooth transitions, and a focused user experience across desktop, tablet, and mobile screens.

## Live Demo

**Live Website:** Add your portfolio URL here

## Features

- Responsive design for desktop, tablet, and mobile
- Hero section with introduction and profile image
- About section with downloadable resume
- Technical skills and technology categories
- Project showcase with live and GitHub links
- Project image panels
- Experience section
- Contact form with EmailJS delivery
- Service selection for Website, Mobile, or Web + Mobile
- Smooth anchor navigation
- GSAP and ScrollTrigger animations
- Responsive mobile navigation
- Copy-to-clipboard email button
- LinkedIn and GitHub links
- SEO-friendly HTML structure

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Responsive CSS layouts and media queries

### Libraries and Services

- GSAP and ScrollTrigger for animations
- EmailJS for contact form email delivery
- Google Fonts: Inter and JetBrains Mono

### Development Tools

- Git
- GitHub
- Visual Studio Code
- Python local HTTP server

## Project Structure

```text
portfolio/
|
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
     ├── about_image.webp
     ├── home_image.webp
     └── Mitul_Patil_Resume.pdf
```

## Getting Started

This is a static website, so it does not require a build step or package installation.

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### 2. Navigate to the project

```bash
cd portfolio
```

### 3. Start a local server

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

You can also open `index.html` directly, but using a local server is recommended for reliable asset loading and browser behavior.

## Contact Form

The contact form uses EmailJS to send visitor messages directly to the configured inbox without requiring a custom backend.

```text
Visitor
    |
    | fills in the form
    v
Portfolio frontend
    |
    | sends form data
    v
EmailJS
    |
    | delivers the email
    v
Portfolio owner's inbox
```

The form collects:

- Name
- Email
- Service
- Message

Available service options:

- Website
- Mobile
- Web + Mobile

### EmailJS Template

Configure an EmailJS template with these variables:

```text
{{name}}
{{email}}
{{service}}
{{message}}
```

Set the template recipient to `patilmitul1911@gmail.com` and make sure the service ID, template ID, and public key in `script.js` match the EmailJS project.

The EmailJS public key is intended for browser-side use. Do not add private API credentials to this repository.

## Responsive Design

The layout adapts to:

- Desktop screens
- Laptop screens
- Tablets
- Mobile phones

Responsive behavior includes mobile navigation, fluid typography, stacked project layouts, equal section gutters, contained images, and mobile-friendly form controls.

## Screenshots

Add screenshots here when available:

### Home

_Add screenshot here._

### Projects

_Add screenshot here._

### Contact

_Add screenshot here._

## Engineering Considerations

- Keep the layout responsive without horizontal overflow.
- Keep image assets contained within their visual panels.
- Provide clear feedback while contact messages are being sent.
- Keep the project dependency-light and easy to deploy.
- Use progressive enhancement for animations and interactions.
- Keep external service configuration isolated in the relevant integration code.

## Future Improvements

- Add a custom backend for contact form processing.
- Add project filtering or categorization.
- Add analytics and performance monitoring.
- Improve automated accessibility testing.
- Add automated tests for form behavior.
- Add a CMS for managing projects and experience.
- Add a CI/CD deployment workflow.

## Author

**Mitul Patil**

- GitHub: [MitulPatil](https://github.com/MitulPatil)
- LinkedIn: [Mitul Patil](https://www.linkedin.com/in/mitul-patil-471456256/)
- Email: [patilmitul1911@gmail.com](mailto:patilmitul1911@gmail.com)

## License

This project is a personal portfolio and is intended for personal and educational use.
