import getUserId from '../utils/getUserId';

const Query = {
  greeting(parent, args, ctx, info) {
    if (args.name) return `Hello, ${args.name}!`;
    return `Hello!`;
  },
  add(parent, args, ctx, info) {
    let sum = args.num1 + args.num2;
    return sum;
  },
  sum(parent, args, ctx, info) {
    if (args.numbers.length === 0) return 0;
    return args.numbers.reduce((acc, cur) => {
      return acc + cur;
    });
  },
  grades(parent, args, ctx, info) {
    return [1, 2, 3];
  },
  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const user = await prisma.query.user({
      where: {
        id: userId,
      },
    });
    return user;
  },
  async post(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);
    console.log(userId);
    const posts = await prisma.query.posts(
      {
        where: {
          id: args.id,
          OR: [
            {
              published: true,
            },
            {
              author: {
                id: userId,
              },
            },
          ],
        },
      },
      info
    );

    console.log(posts);

    if (posts.length === 0) throw new Error('Post not found!');

    return posts[0];
  },
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
        ],
      };
    }
    return prisma.query.users(opArgs, info);
  },

  posts(parent, args, { prisma }, info) {
    const opArgs = {
      where: {
        published: true,
      },
    };
    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query,
        },
        {
          body_contains: args.query,
        },
      ];
    }

    return prisma.query.posts(opArgs, info);
  },
  myPosts(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    const opArgs = {
      where: {
        author: {
          id: userId,
        },
      },
    };
    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query,
        },
        {
          body_contains: args.query,
        },
      ];
    }

    return prisma.query.posts(opArgs, info);
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  },
};

export default Query;
