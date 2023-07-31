const express = require("express");
const searchRoute = express.Router();
const scraper = require("../../scraper/index");
const config = require("../../config");
const createPdf = require("../createPdf/index");
const sendEmail = require("../sendEmail/index");

searchRoute.post("/", async (req, res) => {
  const MAXNAV = config.max_nav;
  try {
    // get results
    const results = await scraper(req.body.keyword, MAXNAV);

    // create pdf
    let pdf = await createPdf(results);

    // send email
    await sendEmail(req.body.email);

    return res.status(200).json(results);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("error running bot, route level");
  }
});

module.exports = searchRoute;
