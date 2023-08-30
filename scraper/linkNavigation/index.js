// this file permit to instead of navigating by clicking on next buttons on google, to instead navigate by google urls and query parameters

// functions helpers
const checkForResultFound = require("../paginateInPages/checkIfResultFound");
const grabResults = require("../paginateInPages/grabResults");
const solveCaptcha = require("../captcha/solveCaptcha");

const linkBasedNavigation = async (page, numberOfPage, keyword, wordsArray) => {
  // constitute words
  const constitute = () => {
    let arrArranged = [];
    wordsArray.forEach((elm) => {
      arrArranged.push('"' + elm.toLowerCase() + '"');
    });
    return arrArranged.join(" OR ");
  };

  // encode keyword
  let encodedKeyword = encodeURIComponent(`site:${keyword} ${constitute()}`);
  let results = [];

  for (let i = 0; i < numberOfPage; i++) {
    let googleLink = `https://www.google.com/search?q=${encodedKeyword}&start=${i}0`;

    // navigate to result pages
    await page.goto(googleLink, {
      waitUntil: "networkidle2",
      timeout: 120000,
    });

    // solving captcha
    try {
      await solveCaptcha(page);
    } catch (error) {
      console.log("error solving captcha linknav/index");
    }

    // check if result found on page
    const isResultFound = await checkForResultFound(page);

    // if no result return result
    if (!isResultFound) {
      break;
    } else {
      // if result grab details
      let currentResults = await grabResults(page);
      results.push(...currentResults);
    }

    // wait 5sec each 4 pagination
    if (i % 5 === 1) {
      console.log("waiting...");
      await page.waitForTimeout(5000);
    }

    // go to next page in loop
  }

  //   if no result return false if result return result
  if (results.length >= 1) {
    return results;
  } else {
    return [];
  }
};

module.exports = linkBasedNavigation;
