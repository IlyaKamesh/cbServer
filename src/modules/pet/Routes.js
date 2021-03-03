import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader';
import userCheckPerm from '../permission/userCheckPerm';

import petCreate from './controllers/create';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import petGetById from './controllers/getById';
import petSearch from './controllers/search';
import petUpdateById from './controllers/updateById';
import petDeleteById from './controllers/deleteById';
import petStats from './controllers/stats';
import pauseController from '../core/pauseController';


const router = Router();

// CRUD

router.get(
  '/stats', // GET /localhost:5000/pet/stats
  serviceHeader('petStats'), // mark request
  userCheckAuth, // midlware  needed to check if user has rights to do the request
  userCheckPerm('pet.search.own'), // midlware has rights to do this operation such as pet.search.own
  pauseController,
  petStats,
);

router.post(
  '/', // POST /localhost:5000/pet/stats
  serviceHeader('petCreate'),
  userCheckAuth,
  userCheckPerm('pet.create.own'),
  // pauseController,
  petCreate,
);

router.get(
  '/:petId',
  serviceHeader('petGetById'),
  userCheckAuth,
  userCheckPerm('pet.get.own'),
  pauseController,
  petGetById,
);

router.post(
  '/search',
  serviceHeader('petSearch'),
  userCheckAuth,
  userCheckPerm('pet.search.own'),
  pauseController,
  petSearch,
);

router.patch(
  '/:petId',
  serviceHeader('petUpdateById'),
  userCheckAuth,
  userCheckPerm('pet.update.own'),
  pauseController,
  petUpdateById,
);

router.delete(
  '/:petId',
  serviceHeader('petDeleteById'),
  userCheckAuth,
  userCheckPerm('pet.delete.own'),
  pauseController,
  petDeleteById,
);

export default router;
