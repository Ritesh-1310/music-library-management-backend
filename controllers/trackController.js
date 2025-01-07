const Track = require("../models/trackModel");

const getAllTracks = async (req, res) => {
  try {
    const { limit = 5, offset = 0, artist_id, album_id, hidden } = req.query;
    const query = {};

    if (artist_id) query.artist_id = artist_id;
    if (album_id) query.album_id = album_id;
    if (hidden !== undefined) query.hidden = hidden === "true";

    const tracks = await Track.find(query)
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    res.status(200).json({
      status: 200,
      data: tracks,
      message: "Tracks retrieved successfully.",
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

const getTrackById = async (req, res) => {
  try {
    const { id } = req.params;
    const track = await Track.findOne({ track_id: id });

    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Track not found.",
        error: "Resource not found.",
      });
    }

    res.status(200).json({
      status: 200,
      data: track,
      message: "Track retrieved successfully.",
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

const addTrack = async (req, res) => {
  try {
    const { name, duration, hidden, album_id, artist_id } = req.body;

    const track = new Track({
      track_id: require("uuid").v4(),
      name,
      duration,
      hidden: hidden || false,
      album_id,
      artist_id,
    });

    await track.save();
    res.status(201).json({
      status: 201,
      data: {
        track_id: track.track_id,
      },
      message: "Track created successfully.",
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

const updateTrack = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const track = await Track.findOneAndUpdate({ track_id: id }, updates, { new: true });

    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Track not found.",
        error: "Resource not found.",
      });
    }

    res.status(200).json({
      status: 200,
      data: {
        track_id: track.track_id,
        updated_fields: Object.keys(updates),
      },
      message: `Track:${track.name} updated successfully.`,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

const deleteTrack = async (req, res) => {
  try {
    const { id } = req.params;

    const track = await Track.findOneAndDelete({ track_id: id });
    if (!track) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Track not found.",
        error: "Resource not found.",
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: `Track:${track.name} deleted successfully.`,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

module.exports = { getAllTracks, getTrackById, addTrack, updateTrack, deleteTrack };
