const { User } = require('../models');
const { HTTPException } = require('../libs/error');
const { verifyPassword, encryptPassword } = require('../libs/password');
const { createToken } = require('../libs/token');

const authentication = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({
    where: {
      email: email
    }
  });

  if (!user) {
    throw new HTTPException('User not found', { status: 404 });
  }

  const isPasswordCorrect = verifyPassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new HTTPException('Email and password combination is not match', { status: 400 });
  }

  const accessToken = createToken(user);
  return { accessToken };
};

const store = async (body) => {
  const { name, email, password } = body;

  const exists = await User.findOne({
    where: {
      email: email
    }
  });

  if (exists) {
    throw new HTTPException('User already exists', { status: 400 });
  }

  const user = await User.create({
    name,
    email,
    password: encryptPassword(password),
    created_at: new Date(),
    updated_at: new Date()
  });

  const accessToken = createToken(user);
  return { accessToken };
};

module.exports = {
  authentication,
  store
};
