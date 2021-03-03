import Pet from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const petGetById = (req, res) => {
  const petId = get(req, 'params.petId');
  const userId = get(req, 'userData.userId');

  Pet.findById(petId)
    // подтягивает данные из соседних коллекций, аналог SQL JOIN
    // .populate({
    //   path: 'members',
    //   select: 'name links',
    // })
    // .populate({
    //   path: 'lectures',
    //   options: { sort: { date: -1 } },
    //   populate: { path: 'understood', select: 'name' },
    // })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(message.success('Get Pet by id ok', doc));
      } else {
        res.status(404).json(message.fail('No pet for provided id'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('PET_GET_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Pet',
        user: userId,
        controller: 'petGetById',
      });

      res.status(400).json(message.fail('Pet get error', analyticsId));
    });
};

export default petGetById;
