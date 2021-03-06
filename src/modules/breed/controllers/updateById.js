import Breed from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

export default async function breedUpdateById(req, res) {
  const breedId = get(req, 'params.breedId');
  const userId = get(req, 'userData.userId');

  Breed.updateOne({ _id: breedId }, { $set: req.body }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Breed updated'));
      } else {
        res.status(400).json(message.fail('Breed not found'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('BREED_UPDATE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Breed',
        entityId: breedId,
        user: userId,
        controller: 'breedUpdateById',
      });

      res.status(400).json(message.fail('Breed update error', analyticsId));
    });
}
