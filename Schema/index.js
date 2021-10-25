const { UserQuery, UserMutation } =require ('./user');
const { NoteQuery, NoteMutation } =require ('./note');
var { buildSchema,GraphQLObjectType,GraphQLSchema,GraphQLInt,GraphQLString,GraphQLList } = require('graphql');


const RootQuery=new GraphQLObjectType({
  name:"RootQueryType",
  fields:{
    ...UserQuery,
    ...NoteQuery,
  }
});

const Mutation=new GraphQLObjectType({
  name:"Mutation",
  fields:{
    ...UserMutation,
    ...NoteMutation,
  }
});

module.exports={RootQuery,Mutation};