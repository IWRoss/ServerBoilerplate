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
 * GET /api/
 */
router.post("/api/:action", async (request, response) => {
  const action = request.params.action;

  try {
    const result = await actions[action]();
    response.json(result);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
