import getUserId from '../utils/getUserId';

const User = {
  email(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);

    if (userId && parent.id === userId) return parent.email;
    return null;
  },
};

export default User;
