const router = require("express").Router();
const Program = require("../models/programModel");

router.route("/").get((req, res) => {
  Program.find()
    .then(programs => res.json(programs))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const { programNumber, programName, programInfo } = req.body;

  const newProgram = new Program({
    programNumber,
    programName,
    programInfo,
  });

  newProgram
    .save()
    .then(() => res.json("Program added!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
  console.log(newProgram);
});

router.route("/:id").get((req, res) => {
  Program.findById(req.params.id)
    .then(program => res.json(program))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req, res) => {
  Program.findByIdAndDelete(req.params.id)
    .then(() => res.json("Program deleted."))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/update/:id").post((req, res) => {
  Program.findById(req.params.id)
    .then(program => {
      program.programNumber = req.body.programNumber;
      program.programName = req.body.programName;
      program.programInfo = req.body.programInfo;

      program
        .save()
        .then(() => res.json("Program updated!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
