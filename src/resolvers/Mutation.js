import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import getUserId from '../utils/getUserId';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length < 8)
      throw new Error('Password must contains atleast 8 characters!');

    const password = await bcrypt.hash(args.data.password, 10);

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
      },
    });

    return {
      user,
      token: jwt.sign(
        {
          userId: user.id,
        },
        'thisisasecret'
      ),
    };
  },

  async loginUser(parent, args, { prisma }, info) {
    const opArgs = {};
    opArgs.where = {
      email: args.data.email,
    };

    const user = await prisma.query.user(opArgs);
    if (!user) throw new Error('No user found!');
    const isMatch = await bcrypt.compare(args.data.password, user.password);
    if (!isMatch) throw new Error('Incorrect Password');
    return {
      user,
      token: jwt.sign({ userId: user.id }, 'thisisasecret'),
    };
  },

  async deleteUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return await prisma.mutation.deleteUser(
      {
        where: {
          id: userId,
        },
      },
      info
    );
  },

  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return await prisma.mutation.updateUser(
      {
        data: args.data,
        where: {
          id: userId,
        },
      },
      info
    );
  },

  async createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return await prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    );
  },

  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId,
      },
    });

    if (!postExists) throw new Error('Unable to delete a post!');
    return await prisma.mutation.deletePost(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },

  async updatePost(parent, args, { prisma }, info) {
    return await prisma.mutation.updatePost(
      {
        data: args.data,
        where: {
          id: args.id,
        },
      },
      info
    );
  },

  async createComment(parent, args, { prisma }, info) {
    return await prisma.mutation.createComment(
      {
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: args.data.author,
            },
          },
          post: {
            connect: {
              id: args.data.post,
            },
          },
        },
      },
      info
    );
  },

  async deleteComment(parent, args, { prisma }, info) {
    return await prisma.mutation.deleteComment(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },

  async updateComment(parent, args, { prisma }, info) {
    return await prisma.mutation.updateComment(
      {
        data: args.data,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

export default Mutation;
