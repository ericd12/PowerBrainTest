const router = require("express").Router();
const Category = require("../models/element-dropdown-models/category.model");

router.route("/").get((req, res) => {
  Category.find()
    .then(cats => res.json(cats))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const { elementCategory } = req.body;
  const newCategory = new Category({ elementCategory });

  newCategory
    .save()
    .then(() => res.json(`New 'Category' added!`))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
