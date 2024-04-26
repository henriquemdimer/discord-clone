import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  id: {
    required: true,
    type: String
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  guildId: {
    required: true,
    type: String
  },
  guild: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Guild'
  }
}, { timestamps: true });

export default mongoose.model('GuildMember', Schema);
