import { GraphQLServer, PubSub } from 'graphql-yoga';

import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import Subscription from './resolvers/Subscription';
import './prisma';

const pubsub = new PubSub();

const resolvers = {
  Query,
  Post,
  User,
  Mutation,
  Subscription,
  Comment,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
    pubsub,
  },
});

server.start(() => console.log('Server is running'));
