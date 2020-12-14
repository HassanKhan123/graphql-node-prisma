const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    return await prisma.mutation.createUser({ data: args.data }, info);
  },

  async deleteUser(parent, args, { prisma }, info) {
    return await prisma.mutation.deleteUser(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },

  async updateUser(parent, args, { prisma }, info) {
    return await prisma.mutation.updateUser(
      {
        data: args.data,
        where: {
          id: args.id,
        },
      },
      info
    );
  },

  async createPost(parent, args, { prisma }, info) {
    return await prisma.mutation.createPost(
      {
        data: {
          title: args.data.title,
          body: args.data.body,
          published: args.data.published,
          author: {
            connect: {
              id: args.data.author,
            },
          },
        },
      },
      info
    );
  },

  async deletePost(parent, args, { prisma }, info) {
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
