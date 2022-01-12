import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetConventionBarcodeInfos from '@modules/boletos/services/GetConventionBarcodeInfos';
import GetTitleBarcodeInfos from '@modules/boletos/services/GetTitleBarcodeInfos';

export default class BoletosController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { barcode } = request.params;

    const getConventionBarcodeInfos = container.resolve(
      GetConventionBarcodeInfos,
    );
    const getTitleBarcodeInfos = container.resolve(GetTitleBarcodeInfos);

    let barcodeInfos = {};

    if (barcode.length === 48) {
      barcodeInfos = getConventionBarcodeInfos.execute({ barcode });
    } else {
      barcodeInfos = getTitleBarcodeInfos.execute({ barcode });
    }

    return response.json(barcodeInfos);
  }
}
