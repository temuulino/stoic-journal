/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure SendGrid
const SENDGRID_API_KEY = functions.config().sendgrid.apikey;
const transporter = nodemailer.createTransport({
  service: "SendGrid",
  auth: {
    user: "apikey",
    pass: SENDGRID_API_KEY,
  },
});

// Firebase function to send welcome email on user creation
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email;
  const displayName = user.displayName || "User";

  const mailOptions = {
    from: "stoicjournalnow@gmail.com",
    to: email,
    subject:
      "Daily Stoic Journal Reminder: Cultivate Resilience and Reflection",
    html: `<p>Hello ${displayName},<br>Time for your daily Stoic reflection! 🌟 Take a moment today to jot down your thoughts and insights in your Stoic Journal. Cultivate resilience and mindfulness with each entry.<br> Happy Journal <br> Best, <br> Stoic Journal</p>`,
  };

  return transporter.sendMail(mailOptions);
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
