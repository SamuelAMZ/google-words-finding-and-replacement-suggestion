// return a the same proxy 5 times and then move to the next
// after all proxy in array used wait 10mins
// then restart from the first

require("dotenv").config();
const config = require("../../config");

const newProxy = () => {
  const proxies = config.proxies;

  let random = Math.floor(Math.random() * config.proxies.length);
  let newProxy = proxies[random];

  console.log(`proxy n° ${random}`);
  return newProxy;
};

module.exports = newProxy;
