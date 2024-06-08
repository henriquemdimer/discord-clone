import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  channelId: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'GuildMember',
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Message', Schema);
