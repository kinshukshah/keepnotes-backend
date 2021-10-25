var { buildSchema, GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, GraphQLID, GraphQLBoolean } = require('graphql');
const { NoteSchema } = require('../models/note.model.js');


const NoteType = new GraphQLObjectType({
  name: "Note",
  fields: () => ({
    _id: { type: GraphQLID },
    userId: { type: GraphQLID },
    title: { type: GraphQLString },
    note: { type: GraphQLString },
    color: { type: GraphQLString },
    isArchive: { type: GraphQLBoolean },
    isPinned: { type: GraphQLBoolean },
    label: { type: GraphQLString },
  })
});


const NoteQuery = {
  getAllNoteByUser: {
    type: new GraphQLList(NoteType),
    args: {
      userId: { type: GraphQLID },
    },
    async resolve(parent, args) {
      try {
        let notesList = await NoteSchema.find({ userId: args.userId });
        return notesList;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
}

const NoteMutation = {
  createNote: {
    type: NoteType,
    args: {
      userId: { type: GraphQLID },
      title: { type: GraphQLString },
      note: { type: GraphQLString },
      color: { type: GraphQLString },
      isArchive: { type: GraphQLBoolean },
      isPinned: { type: GraphQLBoolean },
      label: { type: GraphQLString }
    },
    async resolve(parent, args) {
      const note = await new NoteSchema(args);
      const newNote = await note.save();
      return newNote;
    }
  },
  deleteNote: {
    type: NoteType,
    args: {
      noteId: { type: GraphQLID },
    },
    async resolve(parent, args) {
      const { noteId } = args;
      try {
        let note = await NoteSchema.findOneAndDelete({ _id: noteId });
        return note;
      } catch (err) {
        throw new Error(err.message);
      }
    }
  },
  editNote:{
    type:NoteType,
    args:{
      noteId: { type: GraphQLID },
      userId: { type: GraphQLID },
      title: { type: GraphQLString },
      note: { type: GraphQLString },
      color: { type: GraphQLString },
      isArchive: { type: GraphQLBoolean },
      isPinned: { type: GraphQLBoolean },
      label: { type: GraphQLString }
    },
    async resolve(parent,args){
      const {noteId,title,note,color,isArchive,isPinned,label}=args;
      try{
        let editedNote = await NoteSchema.findOneAndUpdate({_id:noteId}, {title,note,color,isArchive,isPinned,label}, {
          returnOriginal: false
        });
        return editedNote;
      }catch(err){
        throw new Error(err.message);
      }
    },
  }
}
module.exports = { NoteQuery, NoteMutation }