const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");

const noteSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
  },
  note: {
    type: String,
  },
  label: { type: String },
  color: {
    type: String
  },
  isArchive: {
    type: Boolean
  },
  isPinned: {
    type: Boolean
  }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });


const Note = mongoose.model('Note', noteSchema);
module.exports = {
  NoteSchema: Note,
  NoteTC: composeWithMongoose(Note)
};