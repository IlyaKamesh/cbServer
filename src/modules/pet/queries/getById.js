import Pet from '../Model';
import message from '../../utils/messages';

const petGetByIdQuery = (petId) => {
  return Pet.findById(petId)
    .exec()
    .then((doc) => {
      if (doc) {
        return message.success('Pet get by id OK', doc);
      } else {
        return message.fail('No Pet for provided id');
      }
    })
    .catch((err) => {
      return message.fail('Get Pet by id ERROR', err);
    });
};

export default petGetByIdQuery;
