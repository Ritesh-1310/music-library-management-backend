const Album = require("../models/albumModel");

const getAllAlbums = async (req, res) => {
  try {
    const { limit = 5, offset = 0, artist_id, hidden } = req.query;
    const query = {};

    if (artist_id) query.artist_id = artist_id;
    if (hidden !== undefined) query.hidden = hidden === "true";

    const albums = await Album.find(query)
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    res.status(200).json({
      status: 200,
      data: albums,
      message: "Albums retrieved successfully.",
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

const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findOne({ album_id: id });

    if (!album) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Album not found.",
        error: "Resource not found.",
      });
    }

    res.status(200).json({
      status: 200,
      data: album,
      message: "Album retrieved successfully.",
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

const addAlbum = async (req, res) => {
  try {
    const { name, year, hidden, artist_id } = req.body;

    const album = new Album({
      album_id: require("uuid").v4(),
      name,
      year,
      hidden: hidden || false,
      artist_id,
    });

    await album.save();
    res.status(201).json({
      status: 201,
      data: {
        album_id: album.album_id,
      },
      message: "Album created successfully.",
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

const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const album = await Album.findOneAndUpdate({ album_id: id }, updates, { new: true });

    if (!album) {
      return res.status(404).json({ status: 404, message: "Album not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    const album = await Album.findOneAndDelete({ album_id: id });
    if (!album) {
      return res.status(404).json({
        status: 404,
        message: "Album not found",
        data: null,
        error: "Resource not found",
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: `Album:${album.name} deleted successfully.`,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: null,
      error: error.message,
    });
  }
};

module.exports = { getAllAlbums, getAlbumById, addAlbum, updateAlbum, deleteAlbum };
