import Breed from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const breedDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.breedId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  Breed.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Breed deleted'));
      } else {
        res.status(400).json(message.fail('Breed not found'));
      }
    })
    .catch((error) => {
      // Формируем, записываем данные события для аналитики
      const analyticsId = analytics('BREED_DELETE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Breed',
        entityId: _id,
        user: userId,
        controller: 'breedCreate',
      });

      res.status(400).json(message.fail('Breed delete error', analyticsId));
    });
};

export default breedDeleteById;
