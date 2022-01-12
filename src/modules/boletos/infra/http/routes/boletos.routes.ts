import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import BoletosController from '../controllers/BoletosController';
import ValidateBarcodeMiddleware from '../middlewares/ValidateBarcodeMiddleware';

const boletosRouter = Router();
const boletosController = new BoletosController();

boletosRouter.get(
  '/:barcode',
  celebrate({
    [Segments.PARAMS]: {
      barcode: Joi.string()
        .min(47)
        .max(48)
        .regex(/^[0-9]+$/, 'barcode must contain only numbers.')
        .required(),
    },
  }),
  ValidateBarcodeMiddleware.validate,
  boletosController.show,
);

export default boletosRouter;
