const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { QuoteModel } = require("../model/quoteModel");

const favRouter = express.Router();

// POST notes
favRouter.post("/create", auth, async (req, res) => {
  try {
    const quote = new QuoteModel(req.body);
    await quote.save();
    res.status(200).send({ message: "Quote added successfully" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

//GET notes
favRouter.get("/", auth, async (req, res) => {
  const { userID } = req.body;
  try {
    const quotes = await QuoteModel.find({ userID: userID });
    res.status(200).json(quotes);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

//DELETE notes
favRouter.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  const quote = await QuoteModel.findOne({ _id: id });
  try {
    if (req.body?.userID != quote?.userID) {
      res.status(200).send({ message: "Quote not found !!" });
    } else {
      const quote = await QuoteModel.findByIdAndDelete({ _id: id });
      res
        .status(200)
        .send({ message: `Quote with _id: ${id} deleted successfully` });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = {
  favRouter,
};
