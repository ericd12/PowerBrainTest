const router = require('express').Router();
let Program = require('../models/program.model');



router.route('/').get((req, res) => {
    Program.find()
        .then(programs => res.json(programs))
        .catch(err => res.status(400).json('Error: ' + err));
});



// router.route('/add').post((req, res) => {
//     const trackinfo = req.body.trackinfo;

//     const newTrack = new Track({trackinfo});

//     newTrack.save()
//     .then(() => res.json('Track added!' ))
//     .catch(err => res.status(400).json('Error: ' + err));
//     console.log(newTrack)
   
// });

// router.route('/:id').get((req, res) => {
//     Track.findById(req.params.id)
//       .then(track => res.json(track))
//       .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
//     Track.findByIdAndDelete(req.params.id)
//       .then(() => res.json('Element deleted.'))
//       .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/update/:id').post((req, res) => {
//     Track.findById(req.params.id)
//       .then(track => {
//         track.trackinfo = req.body.trackinfo;
      
//         track.save()
//           .then(() => res.json('Element updated!'))
//           .catch(err => res.status(400).json('Error: ' + err));
//       })
//       .catch(err => res.status(400).json('Error: ' + err));
// });


module.exports = router;