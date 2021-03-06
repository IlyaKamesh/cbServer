import mongoose from 'mongoose';

const Schema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    name: {
      type: String,
      required: false,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    petName: {
      type: String,
      required: false,
    },

    birthDate: {
      type: Date,
      required: false,
    },

    email: {
      type: String,
      required: false,
    },

    phone: {
      type: String,
      required: false,
    },

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

    breed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Breed',
      required: false,
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
