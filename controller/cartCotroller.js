import user from "../modal/useModel.js";

export const addBookcart = async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const favbook = await user.findById(id);
    const isbookcart = favbook.cart.includes(bookid);
    
    if (isbookcart) {
      return res.status(200).send({
        success: true,
        message: "this book is already in cart",
      });
    }
    const books = await user.findByIdAndUpdate(id, {
      $push: { cart: bookid },
    });
    return res.status(201).send({
      success: true,
      message: "book add to cart",
      books,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error while add book in to cart",
      error,
    });
  }
};

export const removeBookcart = async (req, res) => {
    try {
      const {id } = req.headers;
      const {bookid} = req.params;
      await user.findByIdAndUpdate(id, { $pull: { cart: bookid } });
      res.status(200).send({
        success: true,
        message: "book remove to cart",
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "error while remove book in to cart",
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


  export const getBookcart = async(req, res) => {
    try {
      const { id } = req.headers;
      const cartbook = await user.findById(id).populate('cart');
      const cartbooks = cartbook.cart.reverse();
  
      res.status(200).send({
        success: true,
        message: "find cart book successfully",
        cartbooks,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "error while get cart books",
        error,
      });
    }
  };
  