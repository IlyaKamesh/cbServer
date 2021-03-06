import Breed from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const breedGetById = (req, res) => {
  const breedId = get(req, 'params.breedId');
  const userId = get(req, 'userData.userId');

  Breed.findById(breedId)
    // подтягивает данные из соседних коллекций, аналог SQL JOIN
    .populate({
      path: 'owner',
      select: 'name',
    })
    // .populate({
    //   path: 'lectures',
    //   options: { sort: { date: -1 } },
    //   populate: { path: 'understood', select: 'name' },
    // })
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(message.success('Get Breed by id ok', doc));
      } else {
        res.status(404).json(message.fail('No breed for provided id'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('BREED_GET_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Breed',
        user: userId,
        controller: 'breedGetById',
      });

      res.status(400).json(message.fail('Breed get error', analyticsId));
    });
};

export default breedGetById;
