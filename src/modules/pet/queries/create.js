import mongoose from 'mongoose';
import Pet from '../Model';
import message from '../../utils/messages';

export default function createPetQuery(values) {
  const _id = values._id || new mongoose.Types.ObjectId();

  const pet = new Pet({
    _id,
    ...values,
  });

  return pet
    .save()
    .then(() => {
      return message.success('Pet created', _id);
    })
    .catch((err) => {
      return message.fail('Pet create error', err);
    });
}
