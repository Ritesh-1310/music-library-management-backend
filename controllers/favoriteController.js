const Favorite = require("../models/favoritesModel");

const getFavorites = async (req, res) => {
  try {
    const { limit = 5, offset = 0 } = req.query;
    const { category } = req.params;

    const favorites = await Favorite.find({ user_id: req.user.user_id, category })
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    res.status(200).json({
      status: 200,
      data: favorites,
      message: "Favorites retrieved successfully.",
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

const addFavorite = async (req, res) => {
  try {
    const { category, item_id } = req.body;

    const favorite = new Favorite({
      favorite_id: require("uuid").v4(),
      user_id: req.user.user_id,
      category,
      item_id,
    });

    await favorite.save();
    res.status(201).json({
      status: 201,
      data: {
        favorite_id: favorite.favorite_id,
      },
      message: "Favorite added successfully.",
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

const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    const favorite = await Favorite.findOneAndDelete({ favorite_id: id });
    if (!favorite) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: "Favorite not found.",
        error: "Resource not found.",
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: "Favorite removed successfully.",
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

module.exports = { getFavorites, addFavorite, deleteFavorite };
