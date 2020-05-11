const router = require("express").Router();
const Element = require("../models/elementModel");

router.route("/").get((req, res) => {
  Element.find()
    .then(elements => res.json(elements))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const {
    elementnumber,
    elementlabel,
    elementDescription,
    elementFormat,
    elementDuration,
    elementCategory,
    elementSubCategory,
    elementMarket,
    elementCogRating,
    elementPhysRating,
    elementLink,
  } = req.body;

  const newElement = new Element({
    elementnumber,
    elementlabel,
    elementDescription,
    elementFormat,
    elementDuration,
    elementCategory,
    elementSubCategory,
    elementMarket,
    elementCogRating,
    elementPhysRating,
    elementLink,
  });

  newElement
    .save()
    .then(() => res.json("Element added!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req, res) => {
  Element.findById(req.params.id)
    .then(element => res.json(element))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req, res) => {
  Element.findByIdAndDelete(req.params.id)
    .then(() => res.json("Element deleted."))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/update/:id").post((req, res) => {
  Element.findById(req.params.id)
    .then(response => {
      const {
        elementnumber,
        elementlabel,
        elementDescription,
        elementFormat,
        elementDuration,
        elementCategory,
        elementSubCategory,
        elementMarket,
        elementCogRating,
        elementPhysRating,
        elementLink,
      } = req.body;

      const element = {
        ...response,
        elementnumber,
        elementlabel,
        elementDescription,
        elementFormat,
        elementDuration,
        elementCategory,
        elementSubCategory,
        elementMarket,
        elementCogRating,
        elementPhysRating,
        elementLink,
      };

      element
        .save()
        .then(() => res.json("Element updated!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
