import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  members: {
    type: Array,
    required: true,
  },
});

const ConversationModel = mongoose.model("Conversation", conversationSchema);
export default ConversationModel;
