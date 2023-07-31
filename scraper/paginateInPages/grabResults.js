// grab all available results from current google page
const config = require("../../config");

const grabResults = async (page) => {
  // get results div
  let results = [];
  let wordsAndSuggetions = config.wordsAndSuggetions;

  try {
    const resultDiv = await page.waitForSelector("#rso", {
      timeout: 4000,
    });
  } catch (error) {
    console.log("nothing from grab details 1");
  }

  // try to see if first result have a table of results  (children)
  let childrenTable = [];
  //  Array.from(document.querySelector("#rso").children)[0].querySelector("table")
  try {
    childrenTable = await page.evaluate((wordsAndSuggetions) => {
      let resArr = [];

      const findReplacement = (word) => {
        if (!word) return "";

        let replacement = "";
        wordsAndSuggetions.forEach((elm) => {
          if (elm.word.toLowerCase() === word) {
            replacement = elm.replacement;
          }
        });
        return replacement.toLowerCase();
      };

      //   get all result in page
      Array.from(document.querySelector("#rso").children).forEach((elm) => {
        if (elm.querySelector("a br")) {
          // getting only the desc
          // let allTexts = elm.querySelector("div")?.textContent;
          // let h3 = elm.querySelector("h3")?.textContent;
          // let desc = "";
          // console.log(allTexts, 'all')
          // console.log(allTexts, 'h3')
          // if (allTexts?.length > 0 && h3?.length > 0) {
          //   desc = allTexts
          //     .split(h3?.trim())[1]
          //     .split(" ")
          //     .reverse()
          //     .join(" ")
          //     .slice(0, 150)
          //     .split(" ")
          //     .reverse()
          //     .join(" ");
          // }

          let url = elm.querySelector("a")?.href;
          let word = elm.querySelector("span em")?.textContent?.toLowerCase();
          let replacement = findReplacement(word);

          if (url && word && replacement) {
            resArr.push({
              // title: h3,
              // desc,
              word: word,
              url: url,
              replacement: replacement,
            });
          }
        }
      });

      return resArr;
    }, wordsAndSuggetions);
  } catch (error) {
    console.log(error);
    console.log("no children results");
  }

  //   push child result into the result
  if (childrenTable.length >= 1) {
    results.push(...childrenTable);
  }

  return results;
};

module.exports = grabResults;
