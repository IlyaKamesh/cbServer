import Pet from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

const petDeleteById = (req, res) => {
  // читаем id из параметров URL запроса
  const _id = get(req, 'params.petId');

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  Pet.deleteOne({ _id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200).json(message.success('Pet deleted'));
      } else {
        res.status(400).json(message.fail('Pet not found'));
      }
    })
    .catch((error) => {
      // Формируем, записываем данные события для аналитики
      const analyticsId = analytics('PET_DELETE_BY_ID_ERROR', {
        error,
        body: req.body,
        entity: 'Pet',
        entityId: _id,
        user: userId,
        controller: 'petCreate',
      });

      res.status(400).json(message.fail('Pet delete error', analyticsId));
    });
};

export default petDeleteById;
