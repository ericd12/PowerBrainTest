const router = require("express").Router();
const Market = require("../models/element-dropdown-models/market.model");

router.route("/").get((req, res) => {
  Market.find()
    .then(markets => res.json(markets))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const { elementMarket } = req.body;
  const newMarket = new Market({ elementMarket });

  newMarket
    .save()
    .then(() => res.json(`New 'Market' added!`))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
