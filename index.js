var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema,GraphQLObjectType,GraphQLSchema} = require('graphql');
const {DBConnect}=require("./dbConnect/db.connect.js");
const cors = require("cors");
var app = express();

const port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const {RootQuery,Mutation}=require('./Schema/index.js');
const schema=new GraphQLSchema({query:RootQuery,mutation:Mutation})

app.get('/', (req, res) => {
  res.send('Welcome to KeepNotes Backend!')
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));-
DBConnect();
app.listen(port);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
