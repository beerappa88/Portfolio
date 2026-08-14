const nodemailer = require("nodemailer");

/**
 * Contact-form handler, shared by two runtimes:
 *   - production: Vercel maps this file to POST /api/contact
 *   - local dev:  server.js mounts it on the same path via Express
 * Both provide a parsed `req.body` and Express-style `res.status().json()`,
 * so one handler covers both.
 */

const LIMITS = { name: 100, email: 200, msg: 5000 };

const HTML_ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

// Visitor input is interpolated into the notification email; escape it so a
// submitted "<script>" arrives as text rather than markup in the inbox.
const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

let transporter;

const getTransporter = () => {
  if (transporter) return transporter;

  const port = parseInt(process.env.SMTP_PORT, 10);

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // implicit TLS on 465, STARTTLS on 587
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  return transporter;
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  const { name, email, msg, website } = req.body || {};

  // Honeypot: the form renders `website` hidden and empty, so only a bot
  // fills it. Answer 200 so the bot sees success and doesn't retry.
  if (website) {
    return res
      .status(200)
      .json({ success: true, message: "Your message was sent successfully" });
  }

  if (!name || !email || !msg) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  if (!isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a valid email address" });
  }

  const tooLong = Object.keys(LIMITS).find(
    (field) => String({ name, email, msg }[field]).length > LIMITS[field]
  );
  if (tooLong) {
    return res.status(400).json({
      success: false,
      message: `${tooLong} must be ${LIMITS[tooLong]} characters or fewer`,
    });
  }

  try {
    await getTransporter().sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL || process.env.SMTP_FROM_EMAIL,
      replyTo: email, // so replying in the mail client reaches the sender
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${msg}`,
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(msg).replace(/\n/g, "<br />")}</p>
      `,
    });

    return res
      .status(200)
      .json({ success: true, message: "Your message was sent successfully" });
  } catch (error) {
    // Log the detail server-side; don't leak SMTP internals to the browser.
    console.error("Contact form failed to send:", error);
    return res.status(500).json({
      success: false,
      message: "Sorry, the message could not be sent. Please try again later.",
    });
  }
};
