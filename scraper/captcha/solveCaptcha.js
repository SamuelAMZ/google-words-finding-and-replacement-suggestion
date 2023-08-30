const axios = require("axios");

const API_KEY = "e11b3835c42819635ea8aa846dd8df3f";

const solveCaptcha = async (page) => {
  // Wait for the reCAPTCHA iframe to be present
  try {
    await page.waitForSelector(".g-recaptcha iframe", { timeout: 7000 });
  } catch (error) {
    console.log("no captcha found");
  }

  // Get the site key from the iframe source
  const iframeSrc = await page.evaluate(() => {
    const iframe = document.querySelector(".g-recaptcha iframe");
    return iframe ? iframe.src : null;
  });

  //   data-s
  const dataS = await page.evaluate(() => {
    const dataSValue = document
      .querySelector(".g-recaptcha")
      .getAttribute("data-s");
    return dataSValue;
  });

  if (!iframeSrc) {
    console.error("Unable to find reCAPTCHA iframe.");
    return;
  }

  // Extract the site key from the iframe source
  const siteKey = iframeSrc.split("k=")[1].split("&")[0].trim();

  // Send the site key to 2captcha for solving the CAPTCHA
  const captchaResponse = await axios.post("http://2captcha.com/in.php", {
    key: API_KEY,
    method: "userrecaptcha",
    googlekey: siteKey,
    pageurl: page.url(),
    "data-s": dataS,
    json: 1,
  });

  if (captchaResponse.data.status !== 1) {
    console.error("Failed to get the CAPTCHA response from 2captcha.");
    return;
  }

  const captchaId = captchaResponse.data.request;

  // Wait for the CAPTCHA to be solved by 2captcha
  await new Promise((resolve) => setTimeout(resolve, 30000)); // Adjust the timeout as needed

  // Poll 2captcha for the CAPTCHA token
  let captchaResult;
  while (!captchaResult) {
    const captchaResultResponse = await axios.get(
      `http://2captcha.com/res.php?key=${API_KEY}&action=get&id=${captchaId}&json=1`
    );
    if (captchaResultResponse.data.status === 1) {
      captchaResult = captchaResultResponse.data.request;
    } else if (captchaResultResponse.data.request === "CAPCHA_NOT_READY") {
      // Wait and try again
      console.log("trying again to solve captcha...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } else if (
      captchaResultResponse.data.request !== "CAPCHA_NOT_READY" &&
      captchaResultResponse.data.status === 0
    ) {
      // console.log(captchaResultResponse.data);
      console.log("error solving captcha");
      return;
    }
  }

  // Inject the CAPTCHA token into the page
  await page.evaluate((captchaToken) => {
    const captchaInputElement = document.querySelector("#g-recaptcha-response");
    if (captchaInputElement) {
      captchaInputElement.style.display = "block";
      captchaInputElement.innerHTML = captchaToken;
      document.querySelector("#captcha-form").submit();
    }
  }, captchaResult);
};

module.exports = solveCaptcha;
