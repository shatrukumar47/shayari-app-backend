const express = require("express");
const axios = require("axios");
const OpenAI = require("openai");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoute");
const { favRouter } = require("./routes/favRoute");



require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/fav", favRouter);



app.get("/", (req, res) => {
  res.send("Welcome to Shayari App");
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/quote", async (req, res) => {
  try {
    const { keyword, type, words } = req.query;
    console.log(req.query);
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Please provide me with a ${type} with respect to ${keyword} with maximum ${words} words`,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const shayari = chatCompletion.choices[0].message;
    res.send({ message: shayari.content });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Database");
    console.log("Server is live at Port 8080");
  } catch (error) {
    console.log(error);
  }
});
