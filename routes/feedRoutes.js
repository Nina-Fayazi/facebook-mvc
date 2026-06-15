const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');


router.get('/', feedController.getAllFeeds);          // GET /feed
router.post('/', feedController.createFeed);         // POST /feed (Form submit)
router.get('/:id', feedController.getFeedById);      // GET /feed/:id
router.get('/edit/:id', feedController.getEditPage);  // GET /feed/edit/:id
router.put('/:id', feedController.updateFeed);       // PUT /feed/:id (Form submit)
router.delete('/:id', feedController.deleteFeed);    // DELETE /feed/:id

module.exports = router;