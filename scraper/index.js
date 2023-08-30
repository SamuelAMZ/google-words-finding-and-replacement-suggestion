const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const { executablePath } = require("puppeteer");

// ressource blocker
const blockResourcesPlugin =
  require("puppeteer-extra-plugin-block-resources")();
puppeteer.use(blockResourcesPlugin);

// proxies
const newProxy = require("./proxy/rotateProxies");

require("dotenv").config();
const config = require("../config");
const solveCaptcha = require("../scraper/captcha/solveCaptcha");

// fonctions imports
const paginateAndReturnResults = require("./paginateInPages/index");
const linkBasedNavigation = require("./linkNavigation/index");

const scraper = async (keyword, numberOfPage) => {
  try {
    const proxySession = newProxy();

    const browser = await puppeteer.launch({
      headless: false,
      executablePath: executablePath(),
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        `--proxy-server=${proxySession}`,
      ],
    });

    const page = await browser.newPage();
    await page.authenticate({
      username: config.proxy_user,
      password: config.proxy_password,
    });

    await page.setViewport({
      width: 1840,
      height: 1080,
      deviceScaleFactor: 1,
    });

    // visit from the top of the archives
    await page.goto("https://google.com", {
      waitUntil: "networkidle2",
      timeout: 120000,
    });

    // solving captcha
    try {
      await solveCaptcha(page);
    } catch (error) {
      console.log("no capthca");
    }

    // close popup
    try {
      const popup = await page.waitForSelector("#W0wltc", { timeout: 3000 });
      await popup.evaluate((b) => b.click());
    } catch (error) {
      console.log("no popup");
    }

    // keyword formation
    const keywords = () => {
      let wordsBag = [];
      let round = 1;

      // getting the words
      config.wordsAndSuggetions.forEach((elm) => {
        wordsBag.push(elm.word);
      });

      // getting the round
      let allWordsLength = wordsBag.join(" ").split(" ").length;
      round = Math.round(allWordsLength / 30);

      // split wordsBag in small pieces of words array
      // loop to get all splited
      let wordsPieces = [];
      let start = 0;
      let end = Math.floor(wordsBag.length / round);
      for (let i = 0; i < round; i++) {
        let arr = [];

        let piece = wordsBag.slice(start, end);
        wordsPieces.push(piece);

        start = end + 1;
        end = end * 2 + 1;
      }

      return { words: wordsPieces, round };
    };

    const firstTyping = async () => {
      //   typing the keyword
      let searchBar = await page.waitForSelector("[name='q']");
      searchBar.value = "";
      await page.type("[name='q']", `site:${keyword} apple`, {
        delay: 100,
      });

      //   click for search
      const launchSearchBtn = await page.$("[name='btnK']");
      await launchSearchBtn.evaluate((b) => b.click());

      //   wait
      await page.waitForTimeout(3000);
    };

    const results = async (wordsArray) => {
      //   paginate on the first 10 results and return all results
      // const results = await paginateAndReturnResults(page, numberOfPage);
      const results = await linkBasedNavigation(
        page,
        numberOfPage,
        keyword,
        wordsArray
      );

      if (!results) {
        return [];
      } else {
        return results;
      }
    };

    // first typing
    await firstTyping();

    // all results found
    let allRes = [];

    for (let i = 0; i < keywords().round; i++) {
      let resultsFound = await results(keywords().words[i]);
      allRes.push(...resultsFound);
    }

    await browser.close();

    // send pdf report
    return allRes;
  } catch (error) {
    console.log(error);
  }
};

module.exports = scraper;
