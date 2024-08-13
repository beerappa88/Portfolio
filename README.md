# My MERN Portfolio

Welcome to my personal portfolio website built using the MERN stack! This portfolio showcases my skills, experience, and projects, and serves as a platform for recruiters and potential collaborators to connect with me.

## Table of Contents

- [Introduction](#introduction)
- [Sections](#sections)
  - [Home](#home)
  - [About](#about)
  - [Education](#education)
  - [Tech Stack](#tech-stack)
  - [Projects](#projects)
  - [Work Experience](#work-experience)
  - [Contact](#contact)
- [Getting Started](#getting-started)
- [SendGrid Email Integration](#sendgrid-email-integration)
- [Installation](#installation)
- [Contact](#contact)

## Introduction

This project is a personal portfolio website built with the MERN stack (MongoDB, Express, React, Node.js). The website contains various sections like Home, About, Education, Tech Stack, Projects, Work Experience, and Contact, allowing recruiters and potential collaborators to learn more about me and my work.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email Service**: SendGrid API

## Sections

### Home
The landing page of the portfolio, giving an overview of who I am and what I do.

### About
A section that provides detailed information about me, my background, and my interests.

### Education
This section lists my educational qualifications.

### Tech Stack
A showcase of the technologies and tools I have expertise in.

### Projects
Details of various projects I have worked on, including links to the source code and live demos where applicable.

### Work Experience
Information about my professional work experience and the roles I have undertaken.

### Contact
A section that allows recruiters or potential collaborators to get in touch with me via a contact form powered by the SendGrid API.

## Getting Started

To get started with the project, clone the repository and follow the installation steps below.

## SendGrid Email Integration

This project uses the [SendGrid API](https://sendgrid.com/) to handle email communication from the contact form. Ensure you have a valid SendGrid API key to enable this feature.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install the dependencies for both the backend and frontend:

    - Backend:
      ```bash
      cd backend
      npm install
      ```

    - Frontend:
      ```bash
      cd frontend
      npm install
      ```

3. Create a `.env` file in the backend directory and add your environment variables:

    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    SENDGRID_API_KEY=your_sendgrid_api_key
    ```

4. Start the development server:

    - Backend:
      ```bash
      cd backend
      npm start
      ```

    - Frontend:
      ```bash
      cd frontend
      npm start
      ```

5. Visit `https://portfolio-8cqz.onrender.com/` in your browser to view the portfolio.

## Contact

Feel free to reach out to me via the contact form on the portfolio website, or connect with me on [LinkedIn](https://www.linkedin.com/in/beerappa/).

