/**
 * Local development server.
 *
 * In production Vercel serves client/build statically and runs api/contact.js
 * as a serverless function — this file is not deployed. It exists so that
 * `npm run dev` works without the Vercel CLI: CRA's dev server proxies
 * /api/* here (see "proxy" in client/package.json).
 */
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/contact", require("./api/contact"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Dev API server running on http://localhost:${PORT}`);
});
