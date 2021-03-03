import Pet from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

export default async function petUpdateById(req, res) {
  const petId = get(req, 'params.petId');
  const userId = get(req, 'userData.userId');

  Pet.updateOne({ _id: petId }, { $set: req.body }, { runValidators: true })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Pet updated'));
      } else {
        res.status(400).json(message.fail('Pet not found'));
      }
    })
    .catch((error) => {
      const analyticsId = analytics('PET_UPDATE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Pet',
        entityId: petId,
        user: userId,
        controller: 'petUpdateById',
      });

      res.status(400).json(message.fail('Pet update error', analyticsId));
    });
}
