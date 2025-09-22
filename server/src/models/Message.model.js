import mongoose from "mongoose";

const messagingSchema = new mongoose.Schema({
  conversationId: {
    type: String,
  },
  senderId: {
    type: String,
  },
  message: {
    type: String,
  },
});

const MessageModel = mongoose.model("Message", messagingSchema);
export default MessageModel;
