import mongoose from 'mongoose';
import Breed from '../Model';
import message from '../../utils/messages';

export default function createBreedQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const breed = new Breed({
    _id,
    ...values,
  });

  return breed
    .save()
    .then(() => {
      return message.success('Breed created', _id);
    })
    .catch((err) => {
      return message.fail('Breed create error', err);
    });
}
