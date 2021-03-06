import Breed from '../Model';
import message from '../../utils/messages';

const breedGetByIdQuery = (breedId) => {
  return Breed.findById(breedId)
    .exec()
    .then((doc) => {
      if (doc) {
        return message.success('Breed get by id OK', doc);
      } else {
        return message.fail('No Breed for provided id');
      }
    })
    .catch((err) => {
      return message.fail('Get Breed by id ERROR', err);
    });
};

export default breedGetByIdQuery;
