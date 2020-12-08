import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466/',
});

// prisma.query.users(null, '{id name email posts {id title}}').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.query
//   .comments(null, '{id text author {name} post {title}}')
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.query.posts(null, '{id title author {name}}').then((data) => {
//   console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.mutation
//   .createPost(
//     {
//       data: {
//         title: 'New Post',
//         body: 'NEW POST BODY',
//         published: true,
//         author: {
//           connect: {
//             id: 'ckidwt5qm00150847dw9h2lti',
//           },
//         },
//       },
//     },
//     '{title,body,published,author {name}}'
//   )
//   .then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//   });

// prisma.mutation
//   .updatePost(
//     {
//       data: {
//         published: false,
//         body: 'UPDATED',
//       },
//       where: {
//         id: 'ckiev4w4a006e0847fa49zhg8',
//       },
//     },
//     '{title body published}'
//   )
//   .then((data) => {
//     console.log(data);
//     return prisma.query.posts(null, '{title body published}');
//   })
//   .then((data) => {
//     console.log(data);
//   });

// const createPostForUser = async (authorId, data) => {
//   const userExits = await prisma.exists.User({
//     id: authorId,
//   });
//   if (!userExits) throw new Error('User not found');
//   const post = await prisma.mutation.createPost(
//     {
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId,
//           },
//         },
//       },
//     },
//     '{author {name posts {title body}}}'
//   );

//   return post;
// };

// createPostForUser('ckidwt5qm00150847dw9h2lti', {
//   title: 'Testing',
//   body: 'AAAAAAAAAAAAAAAAAA',
//   published: true,
// })
//   .then((user) => {
//     console.log(JSON.stringify(user, undefined, 2));
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

const updatePostForUser = async (postId, data) => {
  const postExists = await prisma.exists.Post({
    id: postId,
  });
  if (!postExists) throw new Error('Post not found');
  const post = await prisma.mutation.updatePost(
    {
      data,
      where: {
        id: postId,
      },
    },
    '{author {name posts {title body}}}'
  );

  return post;
};

updatePostForUser('ckiev4w4a006e0847fa49zhg8', {
  body: 'UPDATED AGAIN 2.0',
})
  .then((user) => {
    console.log(JSON.stringify(user, undefined, 2));
  })
  .catch((err) => console.log(err.message));

// prisma.exists
//   .Comment({
//     id: 'ckidy5ebw00770847qaplrmeg',
//   })
//   .then((res) => {
//     console.log(res);
//   });
