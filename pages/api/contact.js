import mongoose from "mongoose";
require("dotenv").config();

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Message = mongoose.model("Message", messageSchema);

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    //store it in a database
    try {
      // connect to mongoDB
      await mongoose.connect(process.env.MONGOOSE_URI);
    } catch (err) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const newMessage = new Message({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    try {
      await newMessage.save();
    } catch (err) {
      await mongoose.disconnect();
      res.status(500).json({ message: "Could not store message to database!" });
      return;
    }

    await mongoose.disconnect();

    res.status(201).json({
      message: "Successfully stored message!",
      newMessage: newMessage,
    });
  }
};

export default handler;
