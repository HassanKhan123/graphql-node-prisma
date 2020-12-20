import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign(
    {
      userId: id,
    },
    'thisisasecret',
    {
      expiresIn: '7 days',
    }
  );
};

export default generateToken;
