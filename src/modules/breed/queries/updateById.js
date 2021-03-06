import Breed from '../Model';
import message from '../../utils/messages';

const breedUpdateByIdQuery = ({ breedId, values }) => {
  return Breed.updateOne({ _id: breedId }, { $set: values }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        return message.success('Breed updated');
      } else {
        return message.fail('Breed not found');
      }
    })
    .catch((error) => {
      return message.fail('Breed update error', error);
    });
};

export default breedUpdateByIdQuery;
