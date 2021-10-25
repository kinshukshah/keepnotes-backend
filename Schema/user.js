var { buildSchema, GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList, GraphQLID } = require('graphql');

const { UserSchema } = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
})

const UserQuery = {
  getAllUser: {
    type: new GraphQLList(UserType),
    args: { id: { type: GraphQLInt } },
    resolve(parent, args) {
      return [];
    }
  }
}

const UserMutation = {
  createUser: {
    type: UserType,
    args: {
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    async resolve(parent, args) {
      const user = await new UserSchema(args);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const newUser = await user.save();
      return newUser;
    }
  },
  loginUser: {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString }
    },
    async resolve(parent, args) {
      let { email, password } = args;
      try {
        const user = await UserSchema.findOne({ email });
        if (user) {
          const validPassword = await bcrypt.compare(password, user.password);
          if (validPassword) {
            return user;
          } else {
            throw new Error("Invalid Password");
          }
        } else {
          throw new Error("User does not exists");
        }
      } catch (err) {
        throw new Error(err.message);
      }
    }
  }
}

module.exports = { UserQuery, UserMutation };