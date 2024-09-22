import user from "../modal/useModel.js";

export const addBookFav = async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const favbook = await user.findById(id);
    const isbookfav = favbook.favorites.includes(bookid);
    if (isbookfav) {
      return res.status(200).send({
        success: true,
        message: "this book is already in favourite",
      });
    }
    const books = await user.findByIdAndUpdate(id, {
      $push: { favorites: bookid },
    });
    return res.status(201).send({
      success: true,
      message: "book add to favourite",
      books,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while add book in to favourite",
      error,
    });
  }
};

export const removeBookFav = async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const favbook = await user.findById(id);
    const isbookfav = favbook.favorites.includes(bookid);
    if (isbookfav)
      await user.findByIdAndUpdate(id, { $pull: { favorites: bookid } });
    res.status(200).send({
      success: true,
      message: "book remove to favourite",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while remove book in to favourite",
      error,
    });
  }
};

export const getBookFav = async (req, res) => {
  try {
    const { id } = req.headers;
    const favbook = await user.findById(id).populate('favorites');
    const favbooks = favbook.favorites;

    res.status(200).send({
      success: true,
      message: "find favourite book successfully",
      favbooks,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while get favourite books",
      error,
    });
  }
};
