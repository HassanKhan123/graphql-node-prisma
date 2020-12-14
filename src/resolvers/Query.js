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
  me() {
    return {
      id: 'abc123',
      name: 'Hassan',
      age: 21,
    };
  },
  post() {
    return {
      id: '12az',
      title: 'GraphQL',
      body: 'Best Place to learn graphQL',
      published: true,
    };
  },
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
          {
            email_contains: args.query,
          },
        ],
      };
    }
    return prisma.query.users(opArgs, info);
  },

  posts(parent, args, { prisma }, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            title_contains: args.query,
          },
          {
            body_contains: args.query,
          },
        ],
      };
    }

    return prisma.query.posts(opArgs, info);
    // if (!args.query) return db.posts;
    // return db.posts.filter((post) => {
    //   const isTitleMatch = post.title
    //     .toLowerCase()
    //     .includes(args.query.toLowerCase());
    //   const isBodyMatch = post.body
    //     .toLowerCase()
    //     .includes(args.query.toLowerCase());
    //   return isTitleMatch || isBodyMatch;
    // });
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
};

export default Query;
