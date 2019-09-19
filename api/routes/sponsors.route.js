const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const sponsors_controller = require('../controllers/sponsors.controller');


// a simple test url to check that all of our files are communicating correctly.
module.exports = router;

router.post('/create', sponsors_controller.sponsors_create);
router.get('/:id', sponsors_controller.sponsors_details);
router.put('/:id/update', sponsors_controller.sponsors_update);
router.delete('/:id/delete', sponsors_controller.sponsors_delete);
