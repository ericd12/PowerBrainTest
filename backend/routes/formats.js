const router = require("express").Router();
const Format = require("../models/element-dropdown-models/format.model");

router.route("/").get((req, res) => {
  Format.find()
    .then(formats => res.json(formats))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const { elementFormat } = req.body;
  const newFormat = new Format({ elementFormat });

  newFormat
    .save()
    .then(() => res.json(`New 'Format' added!`))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
