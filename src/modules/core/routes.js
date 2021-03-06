import fakeRouter from '../_fake/Routes';

import analyticsRouter from '../analytics/Routes';
import userRouter from '../user/userRoutes';
import infoRouter from '../info/infoRoutes';
import serviceRouter from '../service/serviceRoutes';
import baseRouter from '../_base/Routes';
import petRouter from '../pet/Routes';
import breedRouter from '../breed/Routes';

import listRouter from '../lists/Routes';

export default function routes(app) {
  app.use('/base', baseRouter);
  app.use('/fake', fakeRouter);
  app.use('/analytics', analyticsRouter);
  app.use('/info', infoRouter);

  app.use('/service', serviceRouter);
  app.use('/list', listRouter);

  app.use('/user', userRouter);
  app.use('/pet', petRouter);
  app.use('/breed', breedRouter);
}
