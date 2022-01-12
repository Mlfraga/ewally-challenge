interface IRequest {
  barcode: string;
}

interface IResponse {
  barcode: string;
  amount: string;
  expirationDate: Date;
}

class GetConventionBarcodeInfos {
  public execute({ barcode }: IRequest): IResponse {
    const formattedLine = `${barcode.substring(0, 3)}${barcode.substring(
      4,
      11,
    )}${barcode.substring(12, 23)}${barcode.substring(
      24,
      35,
    )}${barcode.substring(36, 47)}`;

    const valor = parseFloat(formattedLine.substring(4, 14)).toString();

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

    // Não consegui pegar a data de vencimento, portanto estou retornando a data de hoje

    return {
      barcode,
      amount,
      expirationDate: new Date(),
    };
  }
}

export default GetConventionBarcodeInfos;
