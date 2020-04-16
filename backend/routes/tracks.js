const router = require("express").Router();
const Track = require("../models/track.model");

router.route("/").get((req, res) => {
  Track.find({})
    .then(tracks => res.json(tracks))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const { trackNumber, trackName, trackinfo } = req.body;

  const newTrack = new Track({
    trackNumber,
    trackName,
    trackinfo,
  });

  newTrack
    .save()
    .then(() => res.json("Track added!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
  console.log(req.body.trackinfo);
});

router.route("/:id").get((req, res) => {
  Track.findById(req.params.id)
    .then(track => res.json(track))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req, res) => {
  Track.findByIdAndDelete(req.params.id)
    .then(() => res.json("Track deleted."))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/update/:id").post((req, res) => {
  Track.findById(req.params.id)
    .then(track => {
      trackNumber = req.body.trackNumber;
      trackName = req.body.trackName;
      // track.trackinfo = req.body.trackinfo;
      track
        .save()
        .then(() => res.json("Track updated!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
