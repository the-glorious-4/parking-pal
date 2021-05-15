const { Schema, model } = require("mongoose");

const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
    // validate: {
    //   validator: () => Promise.resolve(false),
    //   message: 'Email validation failed'
    // }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  parkingPlace: [{ type: Schema.Types.ObjectId, ref: "ParkingPlace" }],
  // inventory: [{ type: Schema.Types.ObjectId, ref: "Inventory" }],
});

// set up pre-save middleware to create password
userSchema.pre(
  "save",
  async function (next) {
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
