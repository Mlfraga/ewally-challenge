import { Router } from 'express';

import usersRouter from '@modules/boletos/infra/http/routes/boletos.routes';

const routes = Router();

routes.use('/boleto', usersRouter);

routes.get('/', (_request, response) =>
  response.json({
    name: 'Barcode API',
    version: '1.0.0',
  }),
);

export default routes;
