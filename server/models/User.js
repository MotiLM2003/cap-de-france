const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  userName: { type: String, required: true, trim: true },
  userPassword: { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: false },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.virtual('customers', {
  ref: 'Customer',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.userPassword;
  delete userObject.tokens;
  delete userObject.__v;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id.toString() }, 'thisismylife', {
    expiresIn: '365 days',
  });
  try {
    user.tokens = user.tokens.concat({ token });
    (' saving');
    user.save();
  } catch (error) {}
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return { message: 'unable to log in email' };
  }
  const isMatch = await bcrypt.compare(password, user.userPassword);
  if (isMatch) {
    return user;
  } else {
    throw new Error('unable to login');
  }
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('userPassword')) {
    user.userPassword = await bcrypt.hash(user.userPassword, 8);
  }
  next();
});

const User = mongoose.model('Users', userSchema);
module.exports = User;
