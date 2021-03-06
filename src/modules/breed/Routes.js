import { Router } from 'express';
import serviceHeader from '../utils/serviceHeader';
import userCheckPerm from '../permission/userCheckPerm';

import breedCreate from './controllers/create';
import userCheckAuth from '../user/middlewares/userCheckAuth';
import breedGetById from './controllers/getById';
import breedSearch from './controllers/search';
import breedUpdateById from './controllers/updateById';
import breedDeleteById from './controllers/deleteById';
import breedStats from './controllers/stats';
import pauseController from '../core/pauseController';

const router = Router();

// CRUD

router.get(
  '/stats', // GET /localhost:5000/breed/stats
  serviceHeader('breedStats'), // mark request
  userCheckAuth, // midlware  needed to check if user has rights to do the request
  userCheckPerm('breed.search.own'), // midlware has rights to do this operation such as breed.search.own
  pauseController,
  breedStats,
);

router.post(
  '/', // POST /localhost:5000/breed/stats
  serviceHeader('breedCreate'),
  userCheckAuth,
  userCheckPerm('breed.create.own'),
  // pauseController,
  breedCreate,
);

router.get(
  '/:breedId',
  serviceHeader('breedGetById'),
  userCheckAuth,
  userCheckPerm('breed.get.own'),
  pauseController,
  breedGetById,
);

router.post(
  '/search',
  serviceHeader('breedSearch'),
  userCheckAuth,
  userCheckPerm('breed.search.own'),
  pauseController,
  breedSearch,
);

router.patch(
  '/:breedId',
  serviceHeader('breedUpdateById'),
  userCheckAuth,
  userCheckPerm('breed.update.own'),
  pauseController,
  breedUpdateById,
);

router.delete(
  '/:breedId',
  serviceHeader('breedDeleteById'),
  userCheckAuth,
  userCheckPerm('breed.delete.own'),
  pauseController,
  breedDeleteById,
);

export default router;
