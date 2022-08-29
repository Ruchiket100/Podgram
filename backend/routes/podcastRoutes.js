const express = require('express')
const router = express.Router();

const { getPodcast, setPodcast, deletePodcast, updatePodcast } = require('../controllers/podcastController')
const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect, getPodcast).post(protect, setPodcast)
router.route('/:id').delete(protect, deletePodcast).put(protect, updatePodcast)


module.exports = router;