const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const router = express.Router();
const bodyparser = require("body-parser");
router.use(bodyparser.json());
const connection = mongoose.connect("mongodb://localhost:27017/MyPortfolio");

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home - My Portfolio",
    current_page_id: "home",
    current_page_loaction: "sidebar",
  });
});
router.get("/about-me", (req, res) => {
  res.render("about", {
    title: "About Me - My Portfolio",
    current_page_id: "about",
    current_page_loaction: "sidebar",
  });
});
router.get("/contact-me", (req, res) => {
  res.render("contact", {
    title: "Contact Me - My Portfolio",
    current_page_id: "contact",
    current_page_loaction: "sidebar",
  });
});
router.get("/education", (req, res) => {
  res.render("education", {
    title: "Education Details - My Portfolio",
    current_page_id: "education",
    current_page_loaction: "header",
  });
});
router.get("/experience", async (req, res) => {
    const experienceCollection = mongoose.connection.collection("Experiences");
    const info= await experienceCollection.findOne({});
    console.log(info.internships_count);
  res.render("experience", {
    title: "Experiences - My Portfolio",
    current_page_id: "experience",
    current_page_loaction: "header",
    data: JSON.stringify(info)
  });
});
router.get("/feedback", (req, res) => {
  res.render("feedback", {
    title: "Send Feedback - My Portfolio",
    current_page_id: "feedback",
    current_page_loaction: "sidebar",
  });
});
router.get("/projects", async (req, res) => {
    const experienceCollection = mongoose.connection.collection("Projects");
    const info= await experienceCollection.findOne({});
    console.log("INFO"+info);
  res.render("projects", {
    title: "Projects - My Portfolio",
    current_page_id: "projects",
    current_page_loaction: "header",
    data:JSON.stringify(info)
  });
});
router.get("/top-skills", async (req, res) => {
    const experienceCollection = mongoose.connection.collection("TopSkills");
    const info= await experienceCollection.findOne({});
    console.log(typeof(info));
  res.render("top_skills", {
    title: "Top Skills - My Portfolio",
    current_page_id: "skills",
    current_page_loaction: "header",
    data:JSON.stringify(info)
  });
});
router.get("/hire-me", (req, res) => {
  res.render("contact", {
    title: "Top Skills - My Portfolio",
    current_page_id: "contact",
    current_page_loaction: "header",
  });
});

router.post("/feedback", (req, res) => {
  const { name, email, feedback, rating } = req.body;
  // Create a transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail", // or another email service
    auth: {
      user: "abhijash04@gmail.com", // your email
      pass: "Abhijash@2001",
    },
  });

  // Set up email data
  let mailOptions = {
    from: email,
    to: "abhijash04@example.com", // your email
    subject: `New Feedback from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nRating: ${rating} stars\n\nFeedback:\n${feedback}`,
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("Error: "+error);
      return res
        .status(500)
        .send("Error sending feedback. Please try again later.");
    }
    alert("Thank you for your feedback!");
  });
});

module.exports = router;
