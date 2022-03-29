const express = require('express');
const router = express.Router();

const {listPages} = require("../services/pages");

router.get('/list', async function(req, res) {
  const pages = await listPages();

  res.send({
    success: true,
    data: pages
  })
});

module.exports = router;