import mongoose from 'mongoose';
//import Pet from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import createPetQuery from '../queries/create';

export default async function petCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  // const description = get(req, 'body.description');
  const email = get(req, 'body.email');
  const phone = get(req, 'body.phone');
  const petName = get(req, 'body.petName');
  const birthDate = get(req, 'body.birthDate');
  const breed = get(req, 'body.breed');
  const location = get(req, 'body.location');

  const createPetQueryResult = await createPetQuery({
    _id,
    email,
    petName,
    birthDate,
    breed,
    phone,
    name,
    location,
    owner: userId,
  });

  if (createPetQueryResult.success) {
    res.status(200).json(createPetQueryResult);
  } else {
    const analyticsId = analytics('PET_CREATE_ERROR', {
      error: createPetQueryResult.payload,
      body: req.body,
      entity: 'Pet',
      entityId: _id,
      user: userId,
      controller: 'petCreate',
    });

    res.status(400).json(message.fail('Pet create error', analyticsId));
  }
}
