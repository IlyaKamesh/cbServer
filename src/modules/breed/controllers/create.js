import mongoose from 'mongoose';
//import Breed from '../Model';
import message from '../../utils/messages';
import analytics from '../../analytics/controllers/analytics';
import { get } from 'lodash';
import createBreedQuery from '../queries/create';

export default async function breedCreate(req, res) {
  // Создаем id материала который будет создан
  const _id = new mongoose.Types.ObjectId();

  // Получаем id текущего пользователя
  const userId = get(req, 'userData.userId');

  // Читаем данные из запроса
  const name = get(req, 'body.name');
  const description = get(req, 'body.description');
  const color = get(req, 'body.color');
  const gender = get(req, 'body.gender');


  const createBreedQueryResult = await createBreedQuery({
    _id,
    color,
    gender,
    name,
    description,
    owner: userId,
  });

  if (createBreedQueryResult.success) {
    res.status(200).json(createBreedQueryResult);
  } else {
    const analyticsId = analytics('BREED_CREATE_ERROR', {
      error: createBreedQueryResult.payload,
      body: req.body,
      entity: 'Breed',
      entityId: _id,
      user: userId,
      controller: 'breedCreate',
    });

    res.status(400).json(message.fail('Breed create error', analyticsId));
  }
}
