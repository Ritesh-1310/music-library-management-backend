const Artist = require("../models/artistModel");

const getAllArtists = async (req, res) => {
  try {
    const { limit = 5, offset = 0, grammy, hidden } = req.query;
    const query = {};

    if (grammy !== undefined) query.grammy = grammy === "true";
    if (hidden !== undefined) query.hidden = hidden === "true";

    const artists = await Artist.find(query)
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    res.status(200).json({
      status: 200,
      data: artists,
      message: "Artists retrieved successfully.",
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

const getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findOne({ artist_id: id });

    if (!artist) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Artist not found.",
        error: "Resource not found.",
      });
    }

    res.status(200).json({
      status: 200,
      data: artist,
      message: "Artist retrieved successfully.",
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

const addArtist = async (req, res) => {
  try {
    const { name, grammy, hidden } = req.body;

    const artist = new Artist({
      artist_id: require("uuid").v4(),
      name,
      grammy: grammy || false,
      hidden: hidden || false,
    });

    await artist.save();
    res.status(201).json({
      status: 201,
      data: {
        artist_id: artist.artist_id,
      },
      message: "Artist created successfully.",
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

const updateArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const artist = await Artist.findOneAndUpdate({ artist_id: id }, updates, { new: true });

    if (!artist) {
      return res.status(404).json({ status: 404, message: "Artist not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

const deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;

    const artist = await Artist.findOneAndDelete({ artist_id: id });
    if (!artist) {
      return res.status(404).json({
        status: 404,
        message: "Artist not found",
        data: null,
        error: "Resource not found",
      });
    }

    res.status(200).json({
      status: 200,
      data: {
        artist_id: artist.artist_id,
      },
      message: `Artist:${artist.name} deleted successfully.`,
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


module.exports = { getAllArtists, getArtistById, addArtist, updateArtist, deleteArtist };
