import mongoose from 'mongoose';

const Schema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    name: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },

    birthdate: {
      type: Date,
      required: false,
    },

    breed: [
      { _id: String, name: String, required: false },
      { _id: String, name: String, required: false },
    ],

    location: {
      lat: String,
      lon: String,
      address: String,
      city: String,
      zip: String,
      state: String,
      country: String,
      required: false,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // tags: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Tags',
    //     required: false,
    //   },
    // ],
  },
  { timestamps: {}, versionKey: false },
);

export default mongoose.model('Pet', Schema);
