import Pet from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';

// Такие контроллеры нельзя давать всем.
// Использовать только на начальных этапах
// так как ответ может быть слишком большим

const petGetAll = (req, res) => {
  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Найти все
  Pet.find()
    .sort({ createdAt: -1 })
    // .select('name') // если нужно получить отдельные поля
    .exec()
    .then((docs) => {
      res.status(200).json(message.success('Get all pets ok', docs));
    })
    .catch((error) => {
      const analyticsId = analytics('PET_GET_ALL_ERROR', {
        error,
        body: req.body,
        entity: 'Pet',
        user: userId,
        controller: 'petGetAll',
      });

      res.status(400).json(message.fail('Pet get all error', analyticsId));
    });
};

export default petGetAll;
