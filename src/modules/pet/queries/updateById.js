import Pet from '../Model';
import message from '../../utils/messages';

const petUpdateByIdQuery = ({ petId, values }) => {
  return Pet.updateOne({ _id: petId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Pet updated');
      } else {
        return message.fail('Pet not found');
      }
    })
    .catch((error) => {
      return message.fail('Pet update error', error);
    });
};

export default petUpdateByIdQuery;
