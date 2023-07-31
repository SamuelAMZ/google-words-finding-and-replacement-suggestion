const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const timeout = require("connect-timeout");

// bot route
const searchRoute = require("./routes/search");

// timeout 10hours
app.use(timeout(36000000));

// cors
let alloweds = {
  origin: [process.env.DOMAIN],
};
app.use(
  cors({
    origin: (origin, callback) => {
      // Check if the origin is allowed
      if (alloweds.origin.includes(origin)) {
        callback(null, true);
      } else {
        // callback(new Error("Not allowed by CORS"));
        callback(null, true);
      }
    },
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// set headers globally
app.use((req, res, next) => {
  // const origin =
  //   alloweds?.origin?.includes(req.header("origin")?.toLowerCase()) &&
  //   req.headers.origin;
  const origin = req.headers.origin;
  // console.log(origin);
  res.header("Access-Control-Allow-Origin", origin);
  res.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
  });
  next();
});

// body parsing
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.status(200).send("Server up");
});

/*   
    @desc: new bot run
    @method: POST
    @privacy: public
*/
app.use("/scraper", searchRoute);

app.listen(process.env.PORT, () =>
  console.log(`app listen on port ${process.env.PORT}`)
);
