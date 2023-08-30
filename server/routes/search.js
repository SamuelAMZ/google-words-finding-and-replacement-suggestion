const express = require("express");
const searchRoute = express.Router();
const scraper = require("../../scraper/index");
const config = require("../../config");
const createPdf = require("../createPdf/index");
const sendEmail = require("../sendEmail/index");

searchRoute.post("/", async (req, res) => {
  res.status(200).json("job started");

  const MAXNAV = config.max_nav;
  try {
    // get results
    const results = await scraper(req.body.keyword, MAXNAV);

    if (results.length < 1) {
      return console.log("no result route");
    }

    // create pdf
    let pdf = await createPdf(results);

    // send email
    await sendEmail(req.body.email);
    console.log("done! " + req.body.keyword);
  } catch (error) {
    console.log(error);
    return console.log("error running bot, route level");
  }
});

module.exports = searchRoute;
