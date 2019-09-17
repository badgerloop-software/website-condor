const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const teamleads_controller = require('../controllers/teamleads.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', teamleads_controller.test);
module.exports = router;

router.post('/create', teamleads_controller.teamleads_create);
router.get('/:id', teamleads_controller.teamleads_details);
router.put('/:id/update', teamleads_controller.teamleads_update);
router.delete('/:id/delete', teamleads_controller.teamleads_delete);
