const express = require("express"),
  router = express.Router();

/**
 * Define actions
 *
 * Corresponds to "action" in our "payload" object
 */
const actions = {
  testAction: async (payload) => {
    return "testAction";
  },
};

/**
 * POST /api/example
 */
router.post("/api/example", async (request, response) => {
  try {
    const payload = request.body.payload;

    const result = await actions[payload.action](payload);

    console.log(result);

    response.json(result);
  } catch (error) {
    console.error(error);
    response.json({
      error: error.message,
    });
  }

  response.send();
});

module.exports = router;
