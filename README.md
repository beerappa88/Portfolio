# 🌟 MERN Portfolio
Welcome to my **personal portfolio website** built using the **MERN stack**.  
This project is designed to **showcase my technical expertise, professional experience, and projects**, while providing an intuitive platform for **recruiters and collaborators to connect with me**.

---

## ✅ Features
- **Modern & Responsive UI** built with **React.js**
- **Backend API** powered by **Express.js & Node.js**
- **SMTP Email Integration** using **Gmail**
- **Optimized Production Build** with static asset serving
- **Structured Sections**:
  - **Home** – Professional overview
  - **About** – Personal background & interests
  - **Education** – Academic qualifications
  - **Tech Stack** – Tools & technologies I use
  - **Projects** – Highlighted work with links
  - **Work Experience** – Career milestones
  - **Contact** – Email-enabled communication form

---

## 🛠 Tech Stack
- **Frontend:** React.js, Bootstrap 5
- **Backend:** Node.js, Express.js
- **Email Service:** Nodemailer with Gmail SMTP
- **Other Tools:** CORS, Concurrently for development

---

## 📂 Project Structure
```
Portfolio/
├── client/                # React frontend (build folder for production)
├── controllers/           # Express controllers (email, etc.)
├── routes/                # API routes
├── server.js              # Express server entry point
├── package.json           # Project scripts and dependencies
└── README.md              # Project documentation
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/beerappa88/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a **`.env`** file in the project root:
```env
PORT=8080
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USE_TLS=true
SMTP_USERNAME=your_gmail_username@gmail.com
SMTP_PASSWORD=your_gmail_app_password
SMTP_FROM_EMAIL=your_gmail_username@gmail.com
```
⚠️ **Important:**
* Enable **2-Step Verification** in your Gmail account.
* Generate an **App Password** for SMTP in your Google account and use it for `SMTP_PASSWORD`.

### 4. Build the Frontend
If you need to rebuild the React app:
```bash
cd client
npm install
npm run build
cd ..
```

### 5. Start the Application
For **development** (runs server and client concurrently):
```bash
npm run dev
```
For **production** (serves built React app):
```bash
npm run server
```

---

## 🔑 Scripts
* `npm run server` — Starts Express server (with nodemon)
* `npm run client` — Starts React development server
* `npm run dev` — Runs both server and client concurrently

---

## 📧 Email Integration
The **contact form** uses **Nodemailer** with **Gmail SMTP** for sending emails.  
Configuration is handled via environment variables (see `.env` setup above).  
Implementation reference: [`controllers/portfolioContoller.js`](controllers/portfolioContoller.js)

---

## 📡 API Endpoints
* `POST /api/v1/portfolio/sendEmail` → Sends an email from the contact form

---

## 🌍 Live Demo
👉 **[Portfolio Website](https://portfolio-8cqz.onrender.com/)**
👉 **[GitHub Repository](https://github.com/beerappa88/Portfolio)**

---

## 📬 Contact
📧 **Email:** Available via contact form on the portfolio  
💼 **LinkedIn:** [linkedin.com/in/beerappa](https://www.linkedin.com/in/beerappa/)  
👨‍💻 **GitHub:** [github.com/beerappa88](https://github.com/beerappa88)

---

## 📜 License
This project is **open-source** and available under the
