import express from "express";
import { connectDb } from "./src/lib/connectDb.js";
import UserModel from "./src/models/User.model.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import ConversationModel from "./src/models/Conversation.model.js";
import MessageModel from "./src/models/Message.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new UserModel({ fullName, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      async (err, token) => {
        if (err) {
          console.error("JWT error:", err);
          return res.status(500).json({ message: "Server error" });
        }

        user.token = token;
        await user.save();
        res.status(200).json({ message: "Login successful", token, user });
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/conversation", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const newConversation = new ConversationModel({
      members: [senderId, receiverId],
    });
    await newConversation.save();
    res.status(201).json({ message: "Conversation created", newConversation });
  } catch (error) {
    console.error("Conversation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/conversations/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await ConversationModel.find({
      members: { $in: [userId] },
    });
    const conversationUserPromises = conversations.map((conversation) => {
      const receiverId = conversation.members.find(
        (member) => member !== userId
      );
      return UserModel.findById(receiverId).select("-password -token");
    });
    const conversationUserData = await Promise.all(conversationUserPromises);
    res.status(200).json({
      message: "Conversations Found",
      conversations: conversationUserData,
    });
  } catch (error) {
    console.error("Get conversations error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/message", async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId = "" } = req.body;
    if (!senderId || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!conversationId) {
      const newConversation = new ConversationModel({
        members: [senderId, receiverId],
      });
      await newConversation.save();
      const newMessage = new MessageModel({
        conversationId: newConversation._id,
        senderId,
        message,
      });
      await newMessage.save();
      return res.status(201).json({ message: "Message sent", newMessage });
    }
    const newMessage = new MessageModel({
      conversationId,
      senderId,
      message,
    });
    await newMessage.save();
    res.status(201).json({ message: "Message sent", newMessage });
  } catch (error) {
    console.error("Message error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/messages/:conversationId", async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await MessageModel.find({ conversationId });
    const messageUserPromises = messages.map((message) => {
      return UserModel.findById(message.senderId).select("-password -token");
    });
    const messageUserData = await Promise.all(messageUserPromises);
    res.status(200).json({
      message: "Messages found",
      messages: messageUserData,
      allMessages: messages,
    });
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on http://localhost:${PORT}`);
});
