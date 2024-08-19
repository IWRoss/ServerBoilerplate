const express = require("express"),
  router = express.Router();

const path = require("path");

/**
 * GET *
 *
 * Almost all GET requests are redirected to the React app. Exceptions are
 * handled inside the closure below.
 */
router.get("*", async (request, response) => {
  console.log("request.baseUrl", request.baseUrl);

  if (request.baseUrl === "/example") {
    // Do logic
    // Return json data
    response.send("is on the example url string");
    return;
  }

  // If request passed the exceptions above, redirect to the React app
  response.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

module.exports = router;
