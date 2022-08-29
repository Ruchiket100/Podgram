const asyncHandler = require("express-async-handler");
const Podcast = require("../models/podcast");
const user = require('../models/user')
// @desc  Get Podcast
// @route GET /Feed
// @access Public
const getPodcast = asyncHandler(async (req, res) => {
    // returive all podcasts in feed
    const podcasts = await Podcast.find();
    res.status(200).json(podcasts);
});

// @desc  Set Podcast
// @route SET /setPodcast
// @access Private
const setPodcast = asyncHandler(async (req, res) => {
    const { name, description, duration, imageUrl, audioUrl } = req.body;
    if (
        !name ||
        !description ||
        !duration ||
        !imageUrl ||
        !audioUrl
    ) {
        res.status(400);
        throw new Error("please fill all requirments");
    }
    const podcast = await Podcast.create({
        user: req.user.id,
        name,
        description,
        duration,
        imageUrl,
        audioUrl
    });
    res.json(podcast);
});

// @desc  Update Podcast
// @route POST /setPodcast
// @access Private
const updatePodcast = asyncHandler(async (req, res) => {
    const podcast = Podcast.findById(req.params.id);
    if (!podcast) {
        res.status(400);
        throw new Error("podcast not found");
    }
    // check user
    if (!req.user) {
        res.status(401)
        throw new Error("user not found")
    }
    // check logged in user matches the podcast user
    if (podcast.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("user not matched")
    }
    // update goal
    const updatedPodcast = await Podcast.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res.json(updatedPodcast);
});

// @desc  Delete Podcast
// @route DELETE /setPodcast
// @access Private
const deletePodcast = asyncHandler(async (req, res) => {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) {
        res.status(400);
        throw new Error("podcast not found");
    }
    // check user
    if (!req.user) {
        res.status(401)
        throw new Error("user not found")
    }

    // check logged in user matches the podcast user
    if (podcast.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("user not matched")
    }
    await Podcast.findByIdAndRemove(req.params.id);
    res.status(200);
    res.json({ status: 'success' });
});

module.exports = {
    getPodcast,
    setPodcast,
    updatePodcast,
    deletePodcast,
};
