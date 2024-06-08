import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  id: {
    required: true,
    type: String
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  guildId: {
    required: true,
    type: String
  },
  guild: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Guild'
  },
  status: {
    type: String,
    required: false,
    default: 'offline'
  }
}, { timestamps: true });

export default mongoose.model('GuildMember', Schema);
