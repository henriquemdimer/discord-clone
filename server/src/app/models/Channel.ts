import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: Number,
    required: true
  },
  parentId: {
    type: String,
    required: false
  },
  guildId: {
    type: String,
    required: true,
  },
  guild: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Guild',
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Channel', Schema);
