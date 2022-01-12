import { addDays } from 'date-fns';

interface IRequest {
  barcode: string;
}

interface IResponse {
  barcode: string;
  amount: string;
  expirationDate: Date;
}

class GetTitleBarcodeInfos {
  public execute({ barcode }: IRequest): IResponse {
    const vencimento = barcode.slice(33, 37);

    const expirationDate = addDays(new Date('10/07/1997'), Number(vencimento));

    const valor = parseFloat(
      barcode.substring(barcode.length - 10, barcode.length),
    ).toString();

    let amount = '0';

    if (valor.length === 2) {
      amount = `0,${valor}`;
    } else if (valor.length === 1) {
      amount = `0,0${valor}`;
    } else {
      amount = `${valor.substring(0, valor.length - 2)},${valor.substring(
        valor.length - 2,
        valor.length,
      )}`;
    }

    return {
      barcode,
      amount,
      expirationDate,
    };
  }
}

export default GetTitleBarcodeInfos;
