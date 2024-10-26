const express = require("express");
const {
  getWebsites,
  getSingleWebsite,
  addWebsite,
  deleteWebsite,
} = require("../controllers/websites.js");
const router = express.Router();

//Website endpoints
router.get("/api/v1/websites/:id/status", getSingleWebsite);
router.get("/api/v1/websites", getWebsites);
router.post("/api/v1/websites", addWebsite);
router.delete("/api/v1/websites/:id", deleteWebsite);


module.exports = { router };
